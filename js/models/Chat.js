var m = require("mithril");

var Firebase = require("firebase/app");
require("firebase/firestore");

var RoomState = require("./RoomState");

var ChatBoxMessage = require("../views/components/ChatBox/ChatBoxMessage");

var Chat = {
    messages: [],
    construct: () => {
        // onSnapshot listener for chat message send
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .onSnapshot((doc) => {
            ChatBoxMessage.messageHistory.push(doc.data().latest_message);
            m.redraw();
        });
    },
    sendMessage: (message) => {
        // send message, grab user id from User object
    }

}

module.exports = Chat;