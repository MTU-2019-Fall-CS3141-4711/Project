var m = require ("mithril");

var RoomState = require("../../../models/RoomState");

var ChatUser = require("./ChatUser");


var ChatList = {
    view: (vnode) => {
        return m("section", {class: "chatboxmessage"}, Object.keys(RoomState.users).map((i) => {
            return m(ChatUser, {user: RoomState.users[i]});
        }));
    }
}

module.exports = ChatList;