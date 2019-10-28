let m = require("mithril");

var arrayQueue = [];

var Queue = {
    enqueue: (URL, User) =>{
        var UserURLTuple = [URL, User];
        arrayQueue.push(UserURLTuple);
        console.log("Queued URL: "+URL + "\nCurrent Queue: "+arrayQueue.toString()+"\nQueued By: "+User);
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
        return arrayQueue;
    }
}

module.exports = Queue;