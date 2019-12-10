var m = require("mithril");
var YT = require("youtube-player");
var Firebase = require ("firebase/app");
require("firebase/firestore");

var RoomState = require("./RoomState");
var User = require("./User");

/**
 * @Docs https://www.npmjs.com/package/youtube-player
 */
var YTVideoFrame = {
    Player: null,
    PlayerState: { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3 },
    Playback: { state: -1, time: 0, updated: 0, video: "" },
    pendingSync: false,
    construct: () => {

        YTVideoFrame.enableDisplay();
        let roomRef = Firebase.firestore().collection("room").doc(RoomState.Room_ID);

        // Host is playback state
        if(!User.isHost){
            // Listen for changes in playback state
            roomRef.onSnapshot( (snapshot) => {
                let data = snapshot.data().playback;

                // No video playing, don't try to load one.
                if(data.video == ""){ return; }

                if(data.video != YTVideoFrame.Playback.video){
                    YTVideoFrame.Playback = data;
                    YTVideoFrame.Player.loadVideoById(data.video).then( ()=> {
                        YTVideoFrame.pendingSync = true;
                    });
                }else{
                    YTVideoFrame.Playback = data;
                    YTVideoFrame.syncPlayback();
                }
            });
            
        }
    },

    /**
     * Runs for all users
     * Called during app initializiation to create the video player iframe
     * and setup event listeners
     */
    enableDisplay: () => { 
        YTVideoFrame.Player = YT('player', {
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
            }
        });
        YTVideoFrame.Player.setVolume(60);
        
        if(User.isHost){
            // If host, send playback change updates to firebase
            YTVideoFrame.Player.on('stateChange', (e) => {
                YTVideoFrame.onVideoStateChange(e.data);
            });
        }else{
            // If not host, track playback changes so we know when to sychronize playback with the host
            YTVideoFrame.Player.on('stateChange', (e) => {
                YTVideoFrame.onVideoStateChangeLocalTrack(e.data);
            })
        }

        YTVideoFrame.Player.on("error", (e) => {
            YTVideoFrame.onVideoError(e.data);
        });
    },

    startPlayerLocal: () => { return YTVideoFrame.Player.playVideo(); },
    pausePlayerLocal: () => { return YTVideoFrame.Player.pauseVideo(); },

    /**
     * Only runs for host
     * Called when pull video out of queue and playing it from the start
     */
    loadVideoLocal: (videoID) => { 
        YTVideoFrame.Player.loadVideoById(videoID);
        YTVideoFrame.Playback = { state: 1, time: 0, updated: 0, video: videoID }; 
        YTVideoFrame.updatePlaybackRemote(1);
    },

    /**
     * Only runs for non-hosts
     * Seek the user's video player to match the playback 
     */
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

    /**
     * Only runs for host
     * Called when host clicks to play / pause video
     */
    togglePlaybackLocal: () => {
        YTVideoFrame.Player.getPlayerState().then( (state) => {
            if(state == YTVideoFrame.PlayerState.PLAYING){
                YTVideoFrame.pausePlayerLocal();
            }else if(state == YTVideoFrame.PlayerState.PAUSED){
                YTVideoFrame.startPlayerLocal();
            }
        });
    },

    /**
     * Only registered to run on the host
     * Sychronize video playback to Firestore
     */
    onVideoStateChange: (state) => {
        var Queue = require("./Queue");
        if(state == YTVideoFrame.PlayerState.ENDED){
            YTVideoFrame.Playback.video = "";
            
            let nextVideo = Queue.dequeue();
            console.log(nextVideo);
            if(nextVideo != null){
                YTVideoFrame.Playback.video = nextVideo.vID;
                YTVideoFrame.updatePlaybackRemote(1);
                YTVideoFrame.Player.loadVideoById(nextVideo.vID);
            }else{
                Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({
                    "playback.video": ""
                });
            }

        }else if(state == YTVideoFrame.PlayerState.PAUSED || state == YTVideoFrame.PlayerState.BUFFERING || state == YTVideoFrame.PlayerState.PLAYING){
            YTVideoFrame.updatePlaybackRemote(state);
        }
    },

    /**
     * Called by onVideoStateChange() to send playback information to Firestore
     */
    updatePlaybackRemote: (state) => {
        YTVideoFrame.Player.getCurrentTime().then( (playbackTime) => {
            if(typeof playbackTime == "undefined"){
                playbackTime = 0;
            }

            Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({
                    "playback.state": state,
                    "playback.time": playbackTime,
                    "playback.updated": Firebase.firestore.Timestamp.now(),
                    "playback.video": YTVideoFrame.Playback.video
            });

        });
    },

    /**
     * Only registered to run on non-hosts
     * Synchronize video playback with the host. (YTPlayer can't seek while buffering / loading)
     * This may have terrible results on slow connections
     */
    onVideoStateChangeLocalTrack: (state) => {
        if(state == YTVideoFrame.PlayerState.PLAYING && YTVideoFrame.pendingSync){
            YTVideoFrame.pendingSync = false;
            YTVideoFrame.syncPlayback();
        }
    },

    onVideoError: (errorCode) => {
        console.log("Player error " + errorCode);
    }
}

module.exports = YTVideoFrame;