var m = require("mithril");

var ChatListTabButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "chatlisttabbutton", value: "Users!", 
            onclick: () => {
                var ChatBox = require("./ChatBox");
                ChatBox.ChatTab = false;
            }
        });
    }
}



module.exports = ChatListTabButton;