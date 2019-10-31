var m = require("mithril");

var ChatMessage = require("./ChatMessage");

var ChatBoxMessage = {
    view: () => {
        var Chat = require("../../../models/Chat");
        return m("div", {class: "chatboxmessage"},
            Chat.messages.map( (i) => {
                return m(ChatMessage, {
                    user: Chat.getUsername(i.senderID), 
                    message: i.text
                });
            })
        );
    }
    
};

module.exports = ChatBoxMessage;