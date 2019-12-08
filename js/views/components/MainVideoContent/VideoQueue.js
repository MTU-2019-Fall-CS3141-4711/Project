var m = require("mithril");

let RoomState = require("./../../../models/RoomState");
var Queue = require("../../../models/Queue");

var QueuedVideo = require("./QueuedVideo");

/*
    Queue of videos to be played with queue moderation controls inline
*/
var VideoQueue = {
    view: () => {
        return m("div", {class:"video-queue"},
            (typeof Queue.q == "object" && Queue.q.length > 0)?
                Queue.q.map( (i) => {
                    return m(QueuedVideo, {
                        videoID: i.docId,
                        videoTitle: i.url,
                        queueUser: RoomState.getUsername(i.user)
                    })
                })
            :
                m("h4", {style: "text-align:center; color: white;"}, "No Videos In Queue.")
        );
    }
}

module.exports = VideoQueue;