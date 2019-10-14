var m = require("mithril");

var ChatBoxMessage = {
    view: (vnode) => {
        return m("div", {class: "chatboxmessage"});
    }
};

module.exports = ChatBoxMessage;