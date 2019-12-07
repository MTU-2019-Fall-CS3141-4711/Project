var m = require("mithril");

var CloseButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "banbutton", value: "X", 
            onclick: () => {
                var ChatBox = require("./ChatBox");
                ChatBox.ChatTab = 1;
            }    
    })
    }
}
module.exports = CloseButton;