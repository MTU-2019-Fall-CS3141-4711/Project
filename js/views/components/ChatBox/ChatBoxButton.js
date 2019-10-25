var m = require("mithril");
var Firebase = require("firebase/app");

var ChatBox = require("./ChatBox");
var ChatBoxText = require("./ChatBoxText");
var RoomState = require("./../../../models/RoomState");

var message;

var ChatBoxButton = {
    view: (vnode) => {
        return m("input[type=button]", {class:"chatboxbutton", value: "Enter",
            onclick: () => {
                console.log("Enter was clicked");
                message = ChatBoxText.ChatMessage;
                console.log(message);
                Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({latest_message: message});
                }
            }
        )}
}


module.exports = ChatBoxButton;
