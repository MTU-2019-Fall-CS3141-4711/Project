var m = require("mithril");
var Firebase = require("firebase/app");

var ChatBox = require("./ChatBox");
var ChatMessage = require("./ChatMessage");

var ChatBoxMessage = {
    messageHistory: [],
    view: (vnode) => {
        return m("div", {class: "chatboxmessage"},
            ChatBoxMessage.messageHistory.map( (i) => {
                return m(ChatMessage, {message: i})
            })
        );
    }
    
};

module.exports = ChatBoxMessage;