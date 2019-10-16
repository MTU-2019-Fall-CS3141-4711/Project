var m = require("mithril");
var ChatBox = require("./ChatBox");

var ChatTabButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "chattabbutton", value: "Chat!", 
            onclick: () => {
                console.log(ChatBox);
                // ChatTab is a variable in ChatBox which controls the visibility of the chat history.
                // When this boolean is true, the chat history is visible.
                ChatBox.setChatList();
                //return Chatbox.ChatTab;
            }
        });
    } 
}
module.exports = ChatTabButton;