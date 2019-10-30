let m = require("mithril");
let Firebase = require("firebase/app");
let RoomState = require("./RoomState");
var arrayQueue = [];

// Firebase.firestore().collection("room").doc(RoomState.Room_ID)

var Queue = {
    construct: () => {
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .onSnapshot((doc) => {
            arrayQueue.push(doc.data().queue);
            console.log("construct called\nArrayQueue: "+arrayQueue.toLocaleString());
            m.redraw();
        });
    },
    enqueue: (URL, User) =>{
        var queueURL = URL;
        var queueUser = User;
        let UserURLTuple = {
            queueURL: queueURL,
            queueUser: queueUser
        }
        arrayQueue.push(UserURLTuple);
        Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({
            queue: Firebase.firestore.FieldValue.arrayUnion(UserURLTuple)
        });
        var VideoQueue = require("./../views/components/MainVideoContent/VideoQueue");
        VideoQueue.enqueue(UserURLTuple.queueURL, UserURLTuple.queueUser);
        console.log("Queued URL: "+URL + "\nCurrent Queue: "+arrayQueue.toLocaleString()+"\nQueued By: "+User);
        return arrayQueue;
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
        arrayQueue = [];
        Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({
            queue: []
        });
        return arrayQueue;
    }
}

module.exports = Queue;