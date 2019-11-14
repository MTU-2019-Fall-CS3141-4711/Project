var m = require("mithril");
var Firebase = require ("firebase/app");
require("firebase/firestore");

var Session = require("./Session");

var RoomState = {
    Room_ID: null,
    users: {},
    getUsername: (userID) => {
        return (typeof RoomState.users[userID] == "undefined")? "Anonymous" : RoomState.users[userID]; 
    },
    constructExisting: (room_id) => {
        // Get the room id from URI
        RoomState.Room_ID = room_id;
        RoomState.initializeListeners();
    
    },
    createNew: (vnode) => {
        return new Promise( (resolve, reject) =>{
            // Create the room with default attributes
            Firebase.firestore().collection("room").add({
                playback: {
                    state: -1,
                    time: 0,
                    last_update: 0
                },
                host: Session.getUid()
            }).then( async (docRefence)=> {

                // Set us as a moderator for this newley created room
                await docRefence.collection("moded_users").doc(Session.getUid()).set({exists: true})
                    .then( () => {
                        // Get the generated ID and store it
                        RoomState.Room_ID = docRefence.id;
                        RoomState.initializeListeners();
                    });

                    resolve();
                    return;
            }).catch( (err) => {
                reject(err);
                return;
            });
        });
    },
    initializeListeners: () => {
         /**
         * Listen for users joining and leaving the room
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("users")
            .onSnapshot( (snapshot) => {
                /**
                 * This will return a list of all the users registered in the room
                 * so it is easiest to just clear the local value and sync with
                 * Firestore/ Firestore cache
                 */
                RoomState.users = {};

                // Build the list
                snapshot.docs.forEach( (docRef) => {
                    RoomState.users[ docRef.id ] = docRef.data().name;
                });
                m.redraw();
            });
            Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("banned_users")
            .onSnapshot( (snapshot) => {
                
            });
    }
}

module.exports = RoomState;