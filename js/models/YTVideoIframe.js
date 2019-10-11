var m = require("mithril");

var YTVideoFrame = {
    CurrentVideo: null,
    generateVideo:() =>{
        console.log(YT.Player);
        YTVideoFrame.CurrentVideo = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {}
        });
    }
}

module.exports = YTVideoFrame;