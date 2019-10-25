var m = require("mithril");

var Chat = require("../../../models/Chat");

var ChatBoxText = require("./ChatBoxText");

var ChatBoxButton = {
    view: () => {
        return m("input[type=button]", {class:"chatboxbutton", value: "Enter",
            onclick: () => {
                    Chat.sendMessage( ChatBoxText.getTextAreaMessage() );
                    ChatBoxText.clearTextArea();
                }
            }
        )}
}


module.exports = ChatBoxButton;
