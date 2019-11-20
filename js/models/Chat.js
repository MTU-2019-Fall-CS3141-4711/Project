var m = require("mithril");

var Firebase = require("firebase/app");
require("firebase/firestore");

var RoomState = require("./RoomState");
var Session = require("./Session");


var Chat = {
    messages: [],
    construct: async () => {
        /**
         * Listen for new chat messages being sent
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("chats")
            .orderBy("timestamp").limit(50)
            .onSnapshot((snapshot) => {
                /**
                 * This will return a list of the last 50 messages sent in chat
                 * so it is easiest to just clear the local value and sync with
                 * Firestore/ Firestore cache
                 */
                Chat.messages = [];

                snapshot.docs.forEach( (docRef) => {
                    
                    Chat.messages.push({
                        senderID: docRef.data().senderID,
                        text: docRef.data().text,
                        style: docRef.data().style
                    });
                });
                m.redraw();
            });
        
    },
    sendMessage: (message, type) => {
        var User = require("./User");
        let userID = Session.getUid();
        if(User.isBannedFunc()){return;}
            Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("chats").add({
                senderID: userID,
                text: message,
                style: type,
                timestamp: Firebase.firestore.Timestamp.now()
            }).then( ()=> {
            // Message sent
            }).catch(function(err){ 
                console.log(err);
            });
        
        
    
    }
}

module.exports = Chat;