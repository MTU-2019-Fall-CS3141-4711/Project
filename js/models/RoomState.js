var m = require("mithril");
var Firebase = require ("firebase/app");
require("firebase/firestore");

var RoomState = {
    Room_ID: "48CslEq1R9dPuFIXbjCC",
    construct: (vnode) => {
        RoomState.Room_ID = vnode.attrs.Room_ID;
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
<<<<<<< Updated upstream
        Firebase.firestore().collection("room").add({
            queue: [],
            is_playing: false,
            playback_time: 0,
            playback_last_update: 0
        }).then( (docRefence)=> {
            docRefence.collection("users").add({
                display_name: "Foo Bar"
            }).then( () => {} ).catch( (err)=> { console.log(err); });
=======
        return new Promise( (resolve, reject) =>{
            // Create the room with default attributes
            Firebase.firestore().collection("room").add({
                latest_message: "",
                queue: [],
                is_playing: false,
                playback_time: 0,
                playback_last_update: 0
            }).then( (docRefence)=> {
                // Add a users subcollection with one user in it
                console.log("This code is running.");
                docRefence.collection("users").add({
                    Chat_Map: {id: docRefence, display_name: "Foo Bar", 
                    isHost: true}
                }).then( () => {} ).catch( (err)=> { console.log(err); });
>>>>>>> Stashed changes

            docRefence.collection("chat_messages").doc("messages").set({
                messages: []
            }).then( () => {} ).catch( (err)=> { console.log(err); });

            RoomState.Room_ID = docRef.id;
            m.route.set("/" + RoomState.Room_ID + "/loading");
        }).catch( (err) => {
            console.log(err);
        });
    }
}

module.exports = RoomState;