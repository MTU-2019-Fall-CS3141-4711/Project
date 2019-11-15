var m = require("mithril");

var Canvas = require("../../../models/Canvas");
var ToolbarState = require("../../../models/ToolbarState");
var User = require("../../../models/User");

var YTVideoPlayer = require("./YTVideoPlayer");``
var YTVideoFrame = require("../../../models/YTVideoIframe");
/*
    Video & Annotation Canvas
*/
var AnnotatedVideo = {
    oninit: function() {
        // Sizes for the Canvas context
        // https://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport
        let relWidth = Math.floor((window.innerWidth / 100) * 65);
        let relHeight = Math.floor((window.innerHeight / 100) * 65);
        console.log(relWidth + " - " + relHeight);
        this.canvas = m("canvas", {
                class: "annotation-canvas",
                width: relWidth,
                height: relHeight,
                onclick: (e) => {
                    if(ToolbarState.getTool() == ToolbarState.POINTER && User.isHost){
                        YTVideoFrame.togglePlaybackLocal();
                    }
                },
                onmousedown: (e) => {
                    if(ToolbarState.getTool() == ToolbarState.BRUSH){
                        Canvas.isDrawing = true;
                        Canvas.sX = e.clientX;
                        Canvas.sY = e.clientY;
                    }
                },
                onmouseup: () => {
                    if(ToolbarState.getTool() == ToolbarState.BRUSH){
                        Canvas.isDrawing = false;
                    }
                },
                onmousemove: (e) => {
                    if(Canvas.isDrawing){
                        // Returned cordinates are of window position, not canvas position so we
                        // need to subtraced the space between the canvas and the edge of the page off
                        let rel = this.canvas.dom.getBoundingClientRect();
                        let x = e.clientX - rel.left;
                        let y = e.clientY - rel.top;
                        Canvas.paint(Canvas.sX, Canvas.sY, x, y);
                    }
                    
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