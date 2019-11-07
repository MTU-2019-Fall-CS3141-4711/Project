var m = require("mithril");
var YT = require("youtube-player");

/**
 * @Docs https://www.npmjs.com/package/youtube-player
 */
var YTVideoFrame = {
    Player: null,
    startPlayer: () => { YTVideoFrame.Player.playVideo(); },
    pausePlayer: () => { YTVideoFrame.Player.pauseVideo(); },
    togglePlayback: () => {
        // Playing
        let playback = YTVideoFrame.Player.getPlayerState().then( (state) => {
            if(state == 1){
                YTVideoFrame.pausePlayer();
            }
            // Paused
            else if(state == 2){
                YTVideoFrame.startPlayer();
            }
    
        }).catch();
       
        // Video is loading so we're not going to try and play / pause it
    },
    loadVideo: (videoID) => { YTVideoFrame.Player.loadVideoById(videoID); },
    enableDisplay: () => { YTVideoFrame.Player = YT('player'); }
}

module.exports = YTVideoFrame;