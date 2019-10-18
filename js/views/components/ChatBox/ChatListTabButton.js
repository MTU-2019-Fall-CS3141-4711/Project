var m = require("mithril");
var ChatBox = require("./ChatBox");

var ChatListTabButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "chatlisttabbutton", value: "Users!", 
            onclick: () => {
                console.log(ChatBox);
                // This variable controls the visibility of the user list.
                ChatBox.setChatList();
               //return ChatBox.ChatTab;
            }
        });
    }
}



module.exports = ChatListTabButton;