var m = require("mithril");

var QueuedVideo = require("./QueuedVideo");
/*
    Queue of videos to be played with queue moderation controls inline
*/
var VideoQueue = {
    view: () => {
        return m("div", {class:"video-queue"},[
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo),
            m(QueuedVideo)
        ]);
    }
}

module.exports = VideoQueue;