var m = require("mithril");

/*
    Video in playback queue with inline moderation controls
*/
var QueuedVideo = {
    view: () => {
        return m("div", {class: "queued-video"},[
            m("div", "Queued Video!")
        ]);
    }
}

module.exports = QueuedVideo;