var m = require("mithril");

var message;

var ChatBoxText = {
    ChatMessage: null,
    view: (vnode) => {
        return m("textarea", {class:"chatboxtext", 
        onkeyup: (e) => {
            console.log(e.target.value);
            ChatBoxText.ChatMessage = e.target.value;
        }
    });
    }
}

module.exports = ChatBoxText;