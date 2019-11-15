var m = require("mithril");

var Canvas = require("../../../models/Canvas");

var ToolbarState = require("../../../models/ToolbarState");
var User = require("../../../models/User");
var YTVideoFrame = require("../../../models/YTVideoIframe");

var DrawingCanvas = {
    // Sizes for the Canvas context
    // https://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport
    oncreate: function(vnode) {
        Canvas.registerCanvas(vnode.dom);
    },
    onupdate: () => {
        Canvas.repaint();
    },
    view: () => {
        let relWidth = Math.floor((window.innerWidth / 100) * 65);
        let relHeight =  Math.floor((window.innerHeight / 100) * 65);
        return m("canvas", {
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
                    let rel = e.target.getBoundingClientRect();
                    let x = Math.floor(e.clientX - rel.left);
                    let y = Math.floor(e.clientY - rel.top);
                    Canvas.drawLine(Canvas.sX, Canvas.sY, x, y);
                }
                
            }
        });
    }
}

module.exports = DrawingCanvas;