var ToolbarState = require("./ToolbarState");
var User = require("./User");

var YTVideoFrame = require("./YTVideoIframe");

var Canvas = {
    construct: () => {

    },

    registerCanvas: (c) => {
        Canvas.context = c.getContext("2d");
    },

    click: (e) => {
        if(ToolbarState.getTool() == ToolbarState.POINTER && User.isHost){
            YTVideoFrame.togglePlaybackLocal();
        }
    },

    drawRect: () => {
        Canvas.context.drawRect(150, 150, 100, 100);
    }
}

module.exports = Canvas;