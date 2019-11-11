let m = require("mithril");
let Firebase = require("firebase/app");
let RoomState = require("./RoomState");
var Session = require("../models/Session");
var VideoQueue = require("./../views/components/MainVideoContent/VideoQueue");

// Firebase.firestore().collection("room").doc(RoomState.Room_ID)

var Queue = {
    q: [],
    construct: () => {
        /**
         * Listen for changes to the video queue
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("queue")
            .limit(15)
            .onSnapshot( (snapshot) => {
                /**
                 * This will return a list of all the videos in the queue
                 * so it is easiest to just clear the local value and sync with
                 * Firestore / Firestore cache
                 */
                Queue.q = [];
                snapshot.docs.forEach( (docRef) => {
                    Queue.q.push({
                        url: docRef.data().url,
                        user: docRef.data().user
                    })
                });
                m.redraw();
                //console.log(snapshot);
            });
    },
    enqueue: (URL) =>{
        /**
         * Create a document (queued item) in the queue collection
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("queue").add({
                url: URL,
                user: Session.getUid()
            });
    },

    // not needed yet, but for will when we grab a new video from the queue
    dequeue: ()=>{
        if(arrayQueue.length>0){
            return arrayQueue.pop();
        }else{
            console.error("Queue is empty and we cannot dequeue - Queue.js");
        }
    },
    clearQueue: ()=>{
        /**
         * Get the documents (videos) in the queue and delete them one by one
         */
        Firebase.firestore().collection("room").doc(RoomState.RoomId)
            .collection("queue")
            .get()
            .then( (snapshot) => {
                snapshot.forEach( (docSnapshot) => {
                    docSnapshot.ref.delete();
                }); 
            }).catch( (err) => {

            })
    }
}

module.exports = Queue;