var m = require("mithril");

/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    view: () => {
        return m("div", {class:"video-player"}, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }
};

module.exports = AnnotatedVideo;