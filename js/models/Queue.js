let m = require("mithril");

var arrayQueue = [];

var Queue = {
    enqueue: (URL) =>{
        arrayQueue.push(URL);
        console.log("Queued URL: "+URL + "\nCurrent Queue: "+arrayQueue.toString());
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