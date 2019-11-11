var m = require("mithril");

var ChatUser = {
    view: (vnode) => {
        return m("input[type=button]", {class:"chatuserbutton", value: vnode.attrs.user,
            onclick: () => {
            var ModPopUp = require("./ModPopUp");
            ModPopUp.visibility = true;
            console.log(ModPopUp.visibility);
        }});
    }
}

module.exports = ChatUser;