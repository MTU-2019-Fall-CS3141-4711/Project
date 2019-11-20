var m = require("mithril");

var ChatMessage = require("./ChatMessage");

var ChatBoxMessage = {
    view: () => {
        var RoomState = require("../../../models/RoomState");
        var Chat = require("../../../models/Chat");
        return m("div", {class: "chatboxmessage"},
            Chat.messages.map( (i) => {
                return m(ChatMessage, {
                    user: RoomState.getUsername(i.senderID),
                    style: i.style, 
                    message: i.text
                });
            })
        );
    }
    
};

module.exports = ChatBoxMessage;