var m = require ("mithril");
var Firebase = require("firebase/app");
require("firebase/firestore");

var RoomState = require("../../../models/RoomState");
var Chat = require("../../../models/Chat");

var ChatUser = require("./ChatUser");


var ChatList = {
    view: (vnode) => {
        return m("div", {class: "chatboxmessage"}, Object.keys(Chat.users).map((i) => {
            return m(ChatUser, {user: Chat.users[i]});
        }));
    }
}

module.exports = ChatList;