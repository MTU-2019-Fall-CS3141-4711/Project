var m = require("mithril");
var ChatBox = require("./ChatBox");

var ChatBoxMessage = {
    view: (vnode) => {
        return m("div", {class: "chatboxmessage"}, "Chat Tab");
    }
};

module.exports = ChatBoxMessage;