var m = require("mithril");

var ChatBoxMessage = require("./ChatBoxMessage");
var ChatBoxButton = require("./ChatBoxButton");

var ChatBox = {
    view: (vnode) => {
        return m("section", {class:"chatbox"}, [
            m(ChatBoxMessage),
            m("textarea", {class: "chatboxtext"}),
            m(ChatBoxButton)
        ]);
    }
};

module.exports = ChatBox;