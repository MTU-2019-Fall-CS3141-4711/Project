var m = require("mithril");

var ChatMessage = {
    view: (vnode) => {
        return m("div", {class:"chat_line"}, vnode.attrs.message);
    }
}

module.exports = ChatMessage;