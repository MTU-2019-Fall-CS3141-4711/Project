var m = require("mithril");

var YTVideoPlayer = {
    view: (vnode) =>{
        return m("div", {class: "video-player"}, 
            m("div", {id:"player"})
        );   
    }
}

module.exports = YTVideoPlayer;