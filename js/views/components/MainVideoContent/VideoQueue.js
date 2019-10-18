var m = require("mithril");

var QueuedVideo = require("./QueuedVideo");
/*
    Queue of videos to be played with queue moderation controls inline
*/
var videoArray = [];
// function enqueue(title, user){
//     var newqueue = m(QueuedVideo);
//     newqueue.title = title;
//     newqueue.user = user;
//     return videoArray.push(newqueue);
// }

var VideoQueue = {
    enqueue:(title, user)=>{
        var newqueue = m(QueuedVideo, {videoTitle: title, queueUser: user});
        newqueue.title = title;
        newqueue.user = user;
        return videoArray.push(newqueue);
    },
    view: () => {
        return m("div", {class:"video-queue"}, videoArray);
    }
}

module.exports = VideoQueue;