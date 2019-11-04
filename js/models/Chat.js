var m = require("mithril");

var Firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/database");

var RoomState = require("./RoomState");
var Session = require("./Session");

var Chat = {
    messages: [],
    users: {},
    username: "",
    getUsername: (userID) => {
        return (typeof Chat.users[userID] == "undefined")? "Anonymous" : Chat.users[userID]; 
    },
    construct: async () => {
        Chat.username = await Chat.randomName();

        /**
         * Listen for new chat messages being sent
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("chats")
            .orderBy("timestamp").limit(50)
            .onSnapshot((snapshot) => {
                /**
                 * This will return a list of the last 50 messages sent in chat
                 * so it is easiest to just clear the local value and sync with
                 * Firestore/ Firestore cache
                 */
                Chat.messages = [];

                snapshot.docs.forEach( (docRef) => {
                    Chat.messages.push({
                        senderID: docRef.data().senderID,
                        text: docRef.data().text
                    });
                });
                m.redraw();
            });

        /**
         * Listen for users joining and leaving the chat room
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("users")
            .onSnapshot( (snapshot) => {
                /**
                 * This will return a list of all the users registered in the room
                 * so it is easiest to just clear the local value and sync with
                 * Firestore/ Firestore cache
                 */
                Chat.users = {};

                // Build the list
                snapshot.docs.forEach( (docRef) => {
                    Chat.users[ docRef.id ] = docRef.data().name;
                });
                m.redraw();
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
                        console.log("Error executing disconnect event from Chat server." + err);
                    }
                );

                return;
            }

            /**
             * This tells the database what to do once we've disconnected. The promise resolves
             * once the server acknowledges that it has registered our disconnect task. It does not 
             * resolve once we actually disconnect. When we actually disconnect it will call the .remove()
             */
            Firebase.database().ref(RoomState.Room_ID + "/" + Session.getUid())
                .onDisconnect().remove().then( () => {
                    /**
                     * Mark ourselves as being online now that the server knows what to do when
                     * we go offline. This fires everytime we go online.
                     */
                    Firebase.database().ref(RoomState.Room_ID + "/"+ Session.getUid())
                        .set({name: Chat.username});

                    /**
                     * Add ourself to the user list
                     */
                    Firebase.firestore().collection("room").doc(RoomState.Room_ID)
                        .collection("users").doc(Session.getUid()).set({
                            name: Chat.username
                        }).then( () => {
                            // We sucesfully re-registered ourself with the chat server
                        }).catch( (err) => {
                            console.log("Error reconnecting to chat server. " + err);
                        });
                }).catch( (err) =>{
                    console.log("Error registering disconnect event with Chat server." + err);
                });
        });
        
    },
    sendMessage: (message) => {

        let userID = Session.getUid();
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("chats").add({
                senderID: userID,
                text: message,
                timestamp: Firebase.firestore.Timestamp.now()
            }).then( ()=> {
                // Message sent
            }).catch(function(err){ 
                console.log(err);
            });
    
    },
    randomName: async () => {
        let username = "Steve";
        await m.request({
            method:"GET",
            url: "https://uinames.com/api/?region=United%20States"
        }).then( (result)=> {
            username = result.name;
        });

        return username;
    }
}

module.exports = Chat;