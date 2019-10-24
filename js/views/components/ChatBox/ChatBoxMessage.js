var m = require("mithril");
var Firebase = require("firebase/app");

var ChatBox = require("./ChatBox");
var ChatMessage = require("./ChatMessage");

var ChatBoxMessage = {
    view: (vnode) => {
        return m("div", {class: "chatboxmessage"}, ChatMessage);
    }
    
};

module.exports = ChatBoxMessage;