var m = require("mithril");

var Firebase = require("firebase/app");
require("firebase/firestore");

var RoomState = require("./RoomState");
var Session = require("./Session");

var Chat = {
    messages: [],
    users: {},
    getUsername: (userID) => {
        return (typeof Chat.users[userID] == "undefined")? "Anonymous" : Chat.users[userID]; 
    },
    construct: () => {
        /**
         * Register user with the "chat server"
         */
        Firebase.firestore()
            .collection("room").doc(RoomState.Room_ID)
            .collection("users").doc(Session.getUid())
            .set({ name: "Steve" })
            .then( (snapshot) => {
                // User was created succesfully
            }).catch( (err) => {
                console.log("Error registering user with server");
                console.log(err);
            });

        /**
         * Listen for new chat messages being sent
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("chats")
            .orderBy("timestamp").limit(50)
            .onSnapshot((snapshot) => {
                Chat.messages = [];

                snapshot.docs.forEach( (docRef) => {
                    Chat.messages.push({
                        senderID: docRef.data().senderID,
                        text: docRef.data().text
                    });
                });
                m.redraw();
            });

        /**
         * Listen for users joining and leaving the chat room
         */
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("users")
            .onSnapshot( (snapshot) => {
                // Clear the list to rebuild from database
                Chat.users = {};

                // Build the list
                snapshot.docs.forEach( (docRef) => {
                    Chat.users[ docRef.id ] = docRef.data().name;
                });
                m.redraw();
            });
        
    },
    sendMessage: (message) => {

        let userID = Session.getUid();
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
            .collection("chats").add({
                senderID: userID,
                text: message,
                timestamp: Firebase.firestore.Timestamp.now()
            }).then( ()=> {
                // Message sent
            }).catch(function(err){ 
                console.log(err);
            });
    
    }

}

module.exports = Chat;