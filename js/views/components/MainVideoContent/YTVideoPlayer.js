var m = require("mithril");

var YTVideoFrame = require("./../../../models/YTVideoIframe");

var YTVideoPlayer = {
    oncreate: () => {
        YTVideoFrame.enableDisplay();
        YTVideoFrame.loadVideo("M7lc1UVf-VE");
    },
    view: (vnode) =>{
        return m("div", {class: "video-player"}, 
            m("div", {id:"player"})
        );   
    }
}

module.exports = YTVideoPlayer;