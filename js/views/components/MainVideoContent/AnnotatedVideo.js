var m = require("mithril");

var YTVideoPlayer = require("./YTVideoPlayer");

/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    view: () => {
        return [ m("canvas", {
                class: "annotation-canvas",
                onclick: (e) => {console.log("clicked");}
            }), 
            m(YTVideoPlayer) 
        ];
    }
};

module.exports = AnnotatedVideo;