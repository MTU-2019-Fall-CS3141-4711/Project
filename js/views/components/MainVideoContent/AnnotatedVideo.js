var m = require("mithril");

/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    view: () => {
        return m("div", {class:"video-player"}, "Video!");
    }
};

module.exports = AnnotatedVideo;