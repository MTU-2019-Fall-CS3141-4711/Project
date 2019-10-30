let m = require("mithril");
let Firebase = require("firebase/app");
let RoomState = require("./RoomState");
var VideoQueue = require("./../views/components/MainVideoContent/VideoQueue");
        

var arrayQueue = [];

// Firebase.firestore().collection("room").doc(RoomState.Room_ID)

var Queue = {
    construct: () => {
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .onSnapshot((doc) => {
            var fbQueue = doc.data().queue;
            arrayQueue.push(fbQueue);
            VideoQueue.clearQueue();
            fbQueue.forEach(function(element){
                Queue.enqueue(element.queueURL, element.queueUser);
            });
            console.log("construct called\nArrayQueue: "+arrayQueue.toLocaleString());
            m.redraw();
        });
    },
    enqueue: (URL, User) =>{
        console.log("Queue.enqueue(URL, User) is executed");
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
        
        VideoQueue.enqueue(UserURLTuple.queueURL, UserURLTuple.queueUser);
        //console.log("Queued URL: "+URL + "\nCurrent Queue: " + arrayQueue.length +" "+arrayQueue.toLocaleString()+"\nQueued By: "+User);
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