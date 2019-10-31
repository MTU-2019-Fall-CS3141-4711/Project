var m = require("mithril");

var Firebase = require("firebase/app");
require("firebase/firestore");

var RoomState = require("./RoomState");
var Session = require("./Session");
var ChatBoxMessage = require("../views/components/ChatBox/ChatBoxMessage");

var Chat = {
    //messages: [],
    construct: () => {
        // onSnapshot listener for chat message send
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .onSnapshot((doc) => {
            ChatBoxMessage.messageHistory.push(doc.data().latest_message);
            m.redraw();
        });

        let UserMap = {
            id: Session.getUid(),
            name: "Steve"
        }
        Firebase.firestore().collection("room").doc(RoomState.Room_ID).collection("users").doc("Users").update(
            {users: Firebase.firestore.FieldValue.arrayUnion(UserMap)}
        );
    },
    sendMessage: (message) => {

        // send message, grab user id from User object
        var Session = require("../models/Session");
        Firebase.firestore().collection("room").doc(RoomState.Room_ID).collection("users").doc("Users").get()
        .then(function(doc){ 
            console.log(doc.data());
            userID = doc.data().users[0].name;
            Firebase.firestore().collection("room").doc(RoomState.Room_ID).update({
                latest_message: userID+":"+" "+message
            });
        }).catch(function(err){ 
            console.log(err);
        })
    
    }

}

module.exports = Chat;