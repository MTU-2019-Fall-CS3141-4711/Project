var m = require("mithril");

let Firebase = require("firebase/app");
let RoomState = require("./../../../models/RoomState");
// Firebase.firestore().collection("room").doc(RoomState.Room_ID)

var QueuedVideo = require("./QueuedVideo");
/*
    Queue of videos to be played with queue moderation controls inline
*/
var videoArray = [];

var VideoQueue = {
    enqueue:(title, user)=>{
        var newqueue = m(QueuedVideo, {videoTitle: title, queueUser: user});
        newqueue.title = title;
        newqueue.user = user;
        return videoArray.push(newqueue);
    },
    dequeue: ()=>{

    },
    clearQueue: ()=>{
        videoArray = [];
        return videoArray;
    },
    view: () => {
        return m("div", {class:"video-queue"}, videoArray);
    }
}

module.exports = VideoQueue;