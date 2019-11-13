var m = require("mithril");

var YTVideoFrame = require("./../../../models/YTVideoIframe");

var YTVideoPlayer = {
    oncreate: () => {
    },
    view: (vnode) =>{
        return m("div", {class: "video-player"}, 
            m("div", {id:"player"})
        );   
    }
}

module.exports = YTVideoPlayer;