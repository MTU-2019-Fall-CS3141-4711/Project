var m = require("mithril");
var Firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/database");

var RoomState = require("./RoomState");
var Session = require("./Session");

var User = {
    username: "Steve",

    isBanned: false,
    isModerator: false,
    isHost: false,
    /**
     * Pulls as necesary permission information and registers user with the server
     */
    construct: async () => {
        User.username = await User.randomName();

        // Check if we're banned
        let banRef = Firebase.firestore().collection("room").doc(RoomState.Room_ID).collection("banned_users").doc(Session.getUid());
        banRef.get().then( (docSnapshot) => {
                if(docSnapshot.exists){
                    User.banned = true;
                    console.log("banRef is running");
                }else{
                    User.banned = false;
                }
            });

        // Listen for us being banned / pardoned
        banRef.onSnapshot( (docSnapshot) => {
            if(docSnapshot.exists){
                User.isBanned = true;
            }else{
                User.isBanned = false;
            }
            m.redraw();
        });

        // Check if we're moded
        let modRef = Firebase.firestore().collection("room").doc(RoomState.Room_ID).collection("moded_users").doc(Session.getUid());
        modRef.get().then( (docSnapshot) => {
                if(docSnapshot.exists){
                    User.moderator = true;
                }else{
                    User.moderator = false;
                }
            });

        // Listen for us being moded / demoted
        modRef.onSnapshot( (docSnapshot) => {
            if(docSnapshot.exists){
                User.isModerator = true;
            }else{
                User.isModerator = false;
            }
            m.redraw();
        });

        // Check if we're hosting - await because we need this to initialize snapshot listeners for video playback
        let hostRef = Firebase.firestore().collection("room").doc(RoomState.Room_ID);
        await hostRef.get().then( (snapshot) => {
            if(snapshot.data().host == Session.getUid()){
                User.isHost = true;
            }
        });

        /**
        * REFERENCE: https://firebase.google.com/docs/firestore/solutions/presence
        * Register listener so application knows when it's lost connection to chat.
        * .info/connected is a special Database path and will fire everytime the user connects
        * or disconnects. 
        */
        Firebase.database().ref(".info/connected").on("value", (snapshot) => {
            /**
             * When connection state changes to false (disocnnect) remove ourselfs from the 
             * user list (local cache). The server will also see us disconnect and execute this same query
             * on the Firestore database so all the other users see us leave.
             */
            if(snapshot.val() == false){
                Firebase.firestore().collection("room").doc(RoomState.Room_ID)
                    .collection("users").doc(Session.getUid())
                    .delete().then( () => {
                        //We've sucesfully removed our self from the userlist
                    }).catch( (err) => {
                        console.log("Error executing disconnect event from server." + err);
                    }
                );

                return;
            }

            /**
             * This tells the database what to do once we've disconnected. The promise resolves
             * once the server acknowledges that it has registered our disconnect task. It does not 
             * resolve once we actually disconnect. When we actually disconnect it will call the .remove()
             */
            Firebase.database().ref(RoomState.Room_ID + "/users/" + Session.getUid())
                .onDisconnect().remove().then( () => {
                    /**
                     * Mark ourselves as being online now that the server knows what to do when
                     * we go offline. This fires everytime we go online.
                     */
                    Firebase.database().ref(RoomState.Room_ID + "/users/"+ Session.getUid())
                        .set({
                            name: User.username
                        });

                    /**
                     * Add ourself to the user list
                     */
                    Firebase.firestore().collection("room").doc(RoomState.Room_ID)
                        .collection("users").doc(Session.getUid()).set({
                            name: User.username
                        }).then( () => {
                            // We sucesfully re-registered ourself with the chat server
                        }).catch( (err) => {
                            console.log("Error reconnecting to server. " + err);
                        });
                }).catch( (err) =>{
                    console.log("Error registering disconnect event with server." + err);
                });
        });
    },

    /**
     * Grant user with userID moderator privileges 
     */
    promoteUser: (userID) => {
        if(!User.isModerator){ return; }
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("moded_users").doc(userID).set({
                exists: true
            });
    },
    
    /**
     * Revoke moderator privileges on user with userID
     */
    demoteUser: (userID) => {
        if(!User.isModerator){ return; }
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("moded_users").doc(userID).delete();
    },

    /**
     * Ban user with userID
     */
    banUser: (userID) => {
        if(!User.isModerator){ return; }
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("banned_users").doc(userID).set({
                exists: true
            });
    },

    /**
     * Unban user with userID
     */
    pardonUser: (userID) => {
        if(!User.isModerator){ return; }
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .   collection("banned_users").doc(userID).delete();
    },

    /**
     * Generate a random name
     */
    randomName: async () => {
        let username = "Steve";
        await m.request({
            method:"GET",
            url: "https://uinames.com/api/?region=United%20States"
        }).then( (result)=> {
            username = result.name;
        });

        return username;
    },
    isBannedFunc: () => {
        return User.isBanned;
    },
    isModdedFunc: () => {
        return User.isModerator;
    }
}

module.exports = User;