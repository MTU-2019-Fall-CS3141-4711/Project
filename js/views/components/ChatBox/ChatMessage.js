var m = require("mithril");

var ChatMessage = {
    view: (vnode) => {
        return m("div", {class:"chat_line"}, [
            m("b", vnode.attrs.user + ": "),
            m("span", vnode.attrs.message)
        ]);
    }
}

module.exports = ChatMessage;