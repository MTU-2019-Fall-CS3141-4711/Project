var m = require("mithril");

var ChatBoxMessage = require("./ChatBoxMessage");
var ChatBoxButton = require("./ChatBoxButton");
var ChatList = require("./ChatList");
var ChatTabButton = require("./ChatTabButton");
var ChatListTabButton = require("./ChatListTabButton");

var ChatBox = {
    ChatTab: true,
    view: (vnode) => {
        //console.log(ChatBox.ChatTab);
        if (ChatBox.ChatTab) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ChatBoxMessage),
                m("textarea", {class: "chatboxtext"}),
                m(ChatBoxButton)
            ]);
        }
        if (!ChatBox.ChatTab) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ChatList),
                m("textarea", {class:"chatboxtext"}),
                m(ChatBoxButton)
            ]);
        }
    },
    setChatList: function () {
        ChatBox.ChatTab = false;
        console.log("It ran the function." + ChatBox.ChatTab);
    }
};
module.exports = ChatBox;