/**
 * This is the entire chat box component on the Room page
 */

var m = require("mithril");

var ChatBoxMessage = require("./ChatBoxMessage");
var ChatBoxButton = require("./ChatBoxButton");
var ChatList = require("./ChatList");
var ChatTabButton = require("./ChatTabButton");
var ChatListTabButton = require("./ChatListTabButton");
var ChatBoxText = require("./ChatBoxText");

var ChatBox = {
    ChatTab: true,
    view: (vnode) => {
        console.log(ChatBox.ChatTab);
        if (ChatBox.ChatTab) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ChatBoxMessage),
                m(ChatBoxText),
                m(ChatBoxButton)
            ]);
        }
        if (!ChatBox.ChatTab) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ChatList),
                m(ChatBoxText),
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