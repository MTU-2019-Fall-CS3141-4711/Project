var m = require("mithril");
var Firebase = require ("firebase/app");
require("firebase/firestore");

var RoomState = {
    Room_ID: null,
    constructExisting: (room_id) => {
        return new Promise( (resolve, reject) => {
            // Get the room id from URI
            RoomState.Room_ID = room_id;
            
            // Get the information about the room
            Firebase.firestore().collection("room").doc(RoomState.Room_ID).get()
            .then( (snapshot) =>{
                snapshot.data().queue;
                snapshot.data().is_playing;
                snapshot.data().playback_time;
                snapshot.data().playback_last_update;
                resolve();
                return;
            }).catch( (err) => {
                console.log(err);
                reject();
                return;
            });
        });
    },
    createNew: (vnode) => {
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
                docRefence.collection("users").doc("Users").set({
                    users: []
                }).then( () => {} ).catch( (err)=> { console.log(err); });

                // Get the generated ID and store it
                RoomState.Room_ID = docRefence.id;
                m.route.set("/" + RoomState.Room_ID + "/loading");

                resolve();
                return;
            }).catch( (err) => {
                console.log(err);
                reject();
                return;
            });
        });
    }
}

module.exports = RoomState;