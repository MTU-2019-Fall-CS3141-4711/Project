var m = require("mithril");
var YT = require("youtube-player");

/**
 * @Docs https://www.npmjs.com/package/youtube-player
 */
var YTVideoFrame = {
    Player: null,
    startPlayer: () => { Player.playVideo(); },
    stopPlayer: () => { Player.stopVideo(); },
    loadVideo: (videoID) => { Player.loadVideoById(videoID); },
    enableDisplay : () => { Player = YT('player'); }
}

module.exports = YTVideoFrame;