var m = require("mithril");

var YTVideoPlayer = require("./YTVideoPlayer");
var DrawingCanvas = require("./DrawingCanvas");
/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    view: () => {     
        return [
            m(DrawingCanvas),
            m(YTVideoPlayer) 
        ];
    }
};

module.exports = AnnotatedVideo;