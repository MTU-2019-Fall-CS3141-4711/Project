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
var ModPopUp = require("./ModPopUp");

var ChatBox = {
    ChatTab: 0,
    view: (vnode) => {

        if (ChatBox.ChatTab == 0) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ChatBoxMessage),
                m(ChatBoxText),
                m(ChatBoxButton)
            ]);
        }
        if (ChatBox.ChatTab == 1) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ChatList),
                m(ChatBoxText),
                m(ChatBoxButton)
            ]);
        }
        if (ChatBox.ChatTab == 2) {
            return m("section", {class:"chatbox"}, [
                m(ChatTabButton),
                m(ChatListTabButton),
                m(ModPopUp),
                m(ChatBoxText),
                m(ChatBoxButton)
            ]);
        }
    }
};
module.exports = ChatBox;