var m = require("mithril");
var Firebase = require ("firebase/app");
require("firebase/firestore");

var RoomState = {
    Room_ID: null,
    construct: (vnode) => {
        // Get the room id from URI
        RoomState.Room_ID = vnode.attrs.Room_ID;
        
        // Get the information about the room
        Firebase.firestore().collection("room").doc(RoomState.Room_ID).get()
        .then( (snapshot) =>{
            snapshot.data().queue;
            snapshot.data().is_playing;
            snapshot.data().playback_time;
            snapshot.data().playback_last_update;
        }).catch( (err) => {
            console.log(err);
        });
    },
    createNew: (vnode) => {
        // Create the room with default attributes
        Firebase.firestore().collection("room").add({
            queue: [],
            is_playing: false,
            playback_time: 0,
            playback_last_update: 0
        }).then( (docRefence)=> {
            // Add a users subcollection with one user in it
            docRefence.collection("users").add({
                display_name: "Foo Bar"
            }).then( () => {} ).catch( (err)=> { console.log(err); });

            // Create a document for messages
            docRefence.collection("chat_messages").doc("messages").set({
                messages: []
            }).then( () => {} ).catch( (err)=> { console.log(err); });

            // Get the generated ID and store it
            RoomState.Room_ID = docRef.id;
            m.route.set("/" + RoomState.Room_ID + "/loading");
        }).catch( (err) => {
            console.log(err);
        });
    }
}

module.exports = RoomState;