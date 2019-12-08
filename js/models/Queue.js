let m = require("mithril");
let Firebase = require("firebase/app");
let RoomState = require("./RoomState");
var Session = require("./Session");
var User = require("./User");
var YTVideoFrame = require("./YTVideoIframe");

var Queue = {
    q: [],
    construct: () => {
        /**
         * Listen for changes to the video queue
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("queue")
            .limit(15)
            .onSnapshot( (snapshot) => {
                /**
                 * This will return a list of all the videos in the queue
                 * so it is easiest to just clear the local value and sync with
                 * Firestore / Firestore cache
                 */
                Queue.q = [];
                snapshot.docs.forEach( (docRef) => {
                    Queue.q.push({
                        docId: docRef.id,
                        vID: docRef.data().vID,
                        user: docRef.data().user
                    })
                });
                m.redraw();
            });
    },

    /**
     * Optional TODO: The queue should implement an observable design paradigm
     * so that the queue triggering logic can go in YTVideoFrame because having it
     * here is messy, but faster to write for now.
     */
    enqueue: (URL) =>{
        /**
         * Extracts video ideas from most YouTube URLs
         * Borowed from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url/27728417#27728417
         */
        let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        res = URL.match(rx);
        if(typeof res == "undefined" || res == null || res.length < 1){
            return;
        }

        let videoID = res[1];
        /**
        * Create a document (queued item) in the queue collection
        */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .collection("queue").doc(Firebase.firestore.Timestamp.now().toMillis().toString()).set({
            vID: videoID,
            user: Session.getUid()

        }).then( () => {
            if(User.isHost && YTVideoFrame.Playback.video == ""){
                YTVideoFrame.loadVideoLocal(Queue.dequeue().vID);
            }

        });
    },

    // not needed yet, but for will when we grab a new video from the queue
    dequeue: ()=>{
        if(Queue.q.length>0){
            let nextVideo = Queue.q.pop();
            
            //Delete the video from the queue
            Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("queue").doc(nextVideo.docId).delete();
            
            return nextVideo;

        }else{
            return null;
        }
    },

    clearQueue: ()=>{
        /**
         * Get the documents (videos) in the queue and delete them one by one
         */
        Firebase.firestore().collection("room").doc(RoomState.RoomId)
            .collection("queue")
            .get()
            .then( (snapshot) => {
                snapshot.forEach( (docSnapshot) => {
                    docSnapshot.ref.delete();
                }); 
            }).catch( (err) => {

            })
    },

    remove: (videoID) => {
        if(User.isModerator){
            Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("queue").doc(videoID).delete();
        }
    }
}

module.exports = Queue;