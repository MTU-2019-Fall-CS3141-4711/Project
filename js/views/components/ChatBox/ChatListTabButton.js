var m = require("mithril");
var ChatBox = require("./ChatBox");

var ChatListTabButton = {
    view: (vnode) => {
        console.log(ChatBox);
        return m("input[type=button]", {class: "chatlisttabbutton", value: "Users!", 
            onclick: () => {
                // This variable controls the visibility of the user list.
                console.log(ChatBox)
                ChatBox.setChatList();
                console.log(ChatBox);
               //return ChatBox.ChatTab;
            }
        });
    }
}



module.exports = ChatListTabButton;