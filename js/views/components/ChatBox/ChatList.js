var m = require ("mithril");
var ChatBox = require("./ChatBox");

var ChatList = {
    view: (vnode) => {
        return m("div", {class: "chatboxmessage"}, "User List");
    }
}

module.exports = ChatList;