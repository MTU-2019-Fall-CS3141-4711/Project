var m = require("mithril");

var YTVideoPlayer = require("./YTVideoPlayer");

/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    view: () => {
        return m(YTVideoPlayer);
    }
};

module.exports = AnnotatedVideo;