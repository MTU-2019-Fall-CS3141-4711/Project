var m = require("mithril");

var ChatTabButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "chattabbutton", value: "Chat!", 
            onclick: () => {
                var ChatBox = require("./ChatBox");
                ChatBox.ChatTab = 0;
            }
        });
    } 
}
module.exports = ChatTabButton;