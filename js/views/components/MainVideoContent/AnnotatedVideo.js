var m = require("mithril");

var Canvas = require("../../../models/Canvas");

var YTVideoPlayer = require("./YTVideoPlayer");

/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    oninit: function() {
        this.canvas = m("canvas", {
                class: "annotation-canvas",
                onclick: (e) => {
                    Canvas.click(e);
                }
            })
    },
    
    oncreate: function() {
        Canvas.registerCanvas(this.canvas.dom);
    },

    view: function() {
        return [
            this.canvas,
            m(YTVideoPlayer) 
        ];
    }
};

module.exports = AnnotatedVideo;