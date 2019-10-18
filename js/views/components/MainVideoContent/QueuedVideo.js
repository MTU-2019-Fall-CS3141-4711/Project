var m = require("mithril");

/*
    Video in playback queue with inline moderation controls
*/
// Default YouTube Thumbnail URL (standard definition)
// https://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg
var title ="";
var user = "";
var QueuedVideo = {
    view: (vnode) => {
        return m("div", {class: "queued-video"},[
            m("img", { // contains the image 
                "src":"https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg","alt":"Queued Video","height":"52","width":"92.44"
            }),
            m("div", {"class":"text-container"},[ // contains the following two text elements
                m("div", {"class":"video-title"}, vnode.attrs.videoTitle),
                m("div", {"class":"queued-by"}, vnode.attrs.queueUser)
            ])
        ]);
    }
}

module.exports = QueuedVideo;
