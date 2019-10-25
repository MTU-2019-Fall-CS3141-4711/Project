var m = require("mithril");
var Firebase = require("firebase/app");

var ChatBoxMessage = require("./ChatBoxMessage");

var ChatMessage = {
    view: (vnode) => {
        return m("div", {}, vnode.attrs.message);
    }
}

module.exports = ChatMessage;