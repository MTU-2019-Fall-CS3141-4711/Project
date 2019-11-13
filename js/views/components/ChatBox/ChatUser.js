var m = require("mithril");

var ChatUser = {
    view: (vnode) => {
        return m("input[type=button]", {class:"chatuserbutton", value: vnode.attrs.user,
            onclick: () => {
            var ModPopUp = require("./ModPopUp");
            var ChatBox = require("./ChatBox");
            ChatBox.ChatTab = 2;
            ModPopUp.user = vnode.attrs.user;
        }});
    }
}

module.exports = ChatUser;