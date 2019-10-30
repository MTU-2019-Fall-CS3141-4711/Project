var m = require ("mithril");
var ChatBox = require("./ChatBox");
var RoomState = require("../../../models/RoomState");
var Firebase = require("firebase/app");
require("firebase/firestore");

var ChatList = {
    User_List: null,
    Users: [],

    oninit: () => {
        //Listens for a new User being added. Redraws the component when a new user is added.
        ChatList.User_List = Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .collection("users").doc(docRefence);
        Firebase.firestore().collection("room").doc(RoomState.Room_ID)
        .collection("users").onSnapshot((doc) => {
            ChatList.Users.push(doc.data().display_name);
            m.redraw();
        })
    },

    view: (vnode) => {
        return m("div", {class: "chatboxmessage"}, ChatList.Users.map((i) => {
            return m(ChatUser, {user: i});
        }));
    }
}

module.exports = ChatList;