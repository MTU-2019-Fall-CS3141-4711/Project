var m = require("mithril");

var ChatMessage = require("./ChatMessage");

var ChatBoxMessage = {
    messageHistory: [],
    view: () => {
        return m("div", {class: "chatboxmessage"},
            ChatBoxMessage.messageHistory.map( (i) => {
                return m(ChatMessage, {message: i});
            })
        );
    }
    
};

module.exports = ChatBoxMessage;