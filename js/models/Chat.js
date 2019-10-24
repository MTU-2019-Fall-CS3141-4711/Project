var m = require("mithril");

var Firebase = require("firebase/app");
require("firebase/firestore");

var RoomState = require("./RoomState");

var Chat = {
    messages: [],
    construct: () => {
        // onSnapshot listener for chat message send
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .onSnapshot((doc) => {
            //Theoretically, called whenever new chat message is added to the array
            //value should be under doc."messages"

            //TODO: pass messages array to ChatBox for rendering
            //Mirror video queue functionality
            //Chat.messages.push(doc.data());
            console.log(doc.data());
        });
    },
    loadMessages: () => {
        Firebase.firestore().collection("room").doc("48CslEq1R9dPuFIXbjCC").collection("chat_messages").doc("messages").get()
        .then( (snapshot) =>{
            console.log(snapshot.data().messages);
        }).catch( (err) => {
            console.log(err);
        });
    },
    sendMessage: (message) => {
        // send message, grab user id from User object
    }

}

module.exports = Chat;