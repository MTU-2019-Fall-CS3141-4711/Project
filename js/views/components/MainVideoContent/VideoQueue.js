var m = require("mithril");

// let Firebase = require("firebase/app");
 let RoomState = require("./../../../models/RoomState");
// var Chat = require("../../../models/Chat");
var Queue = require("../../../models/Queue");
//var User = require("../../../models/User");
// Firebase.firestore().collection("room").doc(RoomState.Room_ID)

var QueuedVideo = require("./QueuedVideo");
/*
    Queue of videos to be played with queue moderation controls inline
*/

var VideoQueue = {
    view: () => {
        return m("div", {class:"video-queue"}, Queue.q.map( (i) => {
            console.log(i.user);
            return m(QueuedVideo, {
                videoTitle: i.url,
                queueUser: RoomState.getUsername(i.user)
            })
        }));
    }
}

module.exports = VideoQueue;