var m = require("mithril");

var ChatUser = {
    view: (vnode) => {
        return m("div", {class:"chat_line"}, vnode.attrs.user);
    }
}

module.exports = ChatUser;