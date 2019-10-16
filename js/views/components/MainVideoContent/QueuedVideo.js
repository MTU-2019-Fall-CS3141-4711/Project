var m = require("mithril");

/*
    Video in playback queue with inline moderation controls
*/
// Default YouTube Thumbnail URL (standard definition)
// https://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg
var QueuedVideo = {
    view: () => {
        return m("div", {class: "queued-video"},[
            m("img", { // contains the image 
                "src":"https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg","alt":"Queued Video","height":"52","width":"92.44"
            }),
            m("div", {"class":"text-container"},[ // contains the following two text elements
                m("div", {"class":"video-title"}, "Queued Video!"),
                m("div", {"class":"queued-by"}, "Queued By!")
            ])
        ]);
    }
}

module.exports = QueuedVideo;
