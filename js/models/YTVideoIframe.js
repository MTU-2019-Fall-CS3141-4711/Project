var m = require("mithril");
var YT = require("youtube-player");
var Firebase = require("firebase/app");
require("firebase/firebase-firestore");

var RoomState = require("./RoomState");
var User = require("./User");

/**
 * @Docs https://www.npmjs.com/package/youtube-player
 */
var YTVideoFrame = {
    Player: null,
    PlayerState: { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3 },
    Playback: { state: -1, time: 0, updated: 0 },
    construct: () => {

        let roomRef = Firebase.firestore().collection("room").doc(RoomState.Room_ID);

        // Get current playback information
        roomRef.get().then( (snapshot) => {
            YTVideoFrame.Playback = snapshot.data().playback;
        });

        // Host is playback state
        if(!User.isHost){
            // Listen for changes in playback state
            roomRef.onSnapshot( (snapshot) => {
                YTVideoFrame.Playback = snapshot.data().playback;
                YTVideoFrame.syncPlayback();
            });
            
        }

        YTVideoFrame.enableDisplay();
        YTVideoFrame.loadVideoLocal("M7lc1UVf-VE");

    },

    enableDisplay: () => { 
        YTVideoFrame.Player = YT('player', {
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
            }
        });
       
        // We don't need to track changes unless this is the host
        if(User.isHost){
            YTVideoFrame.Player.on('stateChange', (e) => {
                YTVideoFrame.onVideoStateChange(e.data);
            });

            YTVideoFrame.Player.on("error", (e) => {
                YTVideoFrame.onVideoError(e.data);
            });
        }
    },

    startPlayerLocal: () => { YTVideoFrame.Player.playVideo(); },
    pausePlayerLocal: () => { YTVideoFrame.Player.pauseVideo(); },
    loadVideoLocal: (videoID) => { YTVideoFrame.Player.loadVideoById(videoID); },
    syncPlayback: () => {
        if(YTVideoFrame.Playback.state == YTVideoFrame.PlayerState.PLAYING){
            // Check time since last timestamp update and add the difference to get current playback time
            let diff = (Firebase.firestore.Timestamp.now().toMillis() - YTVideoFrame.Playback.updated.toMillis()) /1000;
            let time = YTVideoFrame.Playback.time + diff;
            YTVideoFrame.Player.seekTo( time, true ); 
            YTVideoFrame.startPlayerLocal();

        }else if(YTVideoFrame.Playback.state == YTVideoFrame.PlayerState.BUFFERING || YTVideoFrame.Playback.state == YTVideoFrame.PlayerState.PAUSED) {
            // If video state is not playing, then the time in the database will be acurate
            let time = YTVideoFrame.Playback.time;
            YTVideoFrame.pausePlayerLocal();
            YTVideoFrame.Player.seekTo( time, true ); 

        }else if(YTVideoFrame.Playback.state == -1){
            // Not playing anything, we should blank the player
        }
        
        
    },

    togglePlaybackLocal: () => {
        YTVideoFrame.Player.getPlayerState().then( (state) => {
            if(state == YTVideoFrame.PlayerState.PLAYING){
                YTVideoFrame.pausePlayerLocal();
            }else if(state == YTVideoFrame.PlayerState.PAUSED){
                YTVideoFrame.startPlayerLocal();
            }
    
            // Video is loading so we're not going to try and play / pause it

        });
    },

    onVideoStateChange: (state) => {
        if(state == YTVideoFrame.PlayerState.ENDED){
            // TODO: CYCLE TO NEXT VIDEO
        }else if(state == YTVideoFrame.PlayerState.PAUSED || state == YTVideoFrame.PlayerState.BUFFERING || state == YTVideoFrame.PlayerState.PLAYING){
            YTVideoFrame.updatePlaybackRemote(state);
        }
    },

    onVideoError: (errorCode) => {
        console.log("Player error " + errorCode);
    },

    updatePlaybackRemote: (state) => {
        YTVideoFrame.Player.getCurrentTime().then( (playbackTime) => {
        
            Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({
                    "playback.state": state,
                    "playback.time": playbackTime,
                    "playback.updated": Firebase.firestore.Timestamp.now()
            });

        });
    }
}

module.exports = YTVideoFrame;