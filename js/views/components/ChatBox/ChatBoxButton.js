var m = require("mithril");

var Chat = require("../../../models/Chat");

var ChatBoxText = require("./ChatBoxText");

var ChatBoxButton = {
    view: () => {
        return m("input[type=button]", {class:"chatboxbutton", value: "Enter",
            onclick: () => {
                    var msg = ChatBoxText.getTextAreaMessage();
                    if(msg.trim().length!=0){
                        Chat.sendMessage( msg );
                    }
                    ChatBoxText.clearTextArea();
                }
            }
        )}
}


module.exports = ChatBoxButton;
