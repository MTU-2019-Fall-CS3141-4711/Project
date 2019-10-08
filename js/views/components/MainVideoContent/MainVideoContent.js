var m = require("mithril");

var AnnotatedVideo = require("./AnnotatedVideo");
var VideoQueue = require("./VideoQueue");

/*
    View for central video functions area
    Contains:
        - Annotation Canvas
        - Video
        - Video Queue
*/
var MainVideoContent = {
    view: () => {
        return m("section", {class:"main-video-content"},[
            /* Annotation canvas & Video */
            m(AnnotatedVideo),
            m(VideoQueue)
        ]);
    }
};

module.exports = MainVideoContent;