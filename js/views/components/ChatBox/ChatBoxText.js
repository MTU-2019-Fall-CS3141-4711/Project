var m = require("mithril");

var Chat = require("./../../../models/Chat");
var User = require("../../../models/User");

var ChatBoxText = {
    textarea: null,
    view: () => {
        ChatBoxText.textarea = m("textarea", {class:"chatboxtext",
            onkeyup: (e) => {
                if(e.keyCode == 13 && !User.isBanned){
                    var msg = ChatBoxText.getTextAreaMessage();
                    if(msg.trim().length!=0){
                        Chat.sendMessage( msg, "regular" );
                    }
                    ChatBoxText.clearTextArea();
                }
            }
        });
        return ChatBoxText.textarea;
    },
    getTextAreaMessage: () => {
        return ChatBoxText.textarea.dom.value;
    },
    clearTextArea: () => {
        /**
         * TODO: 
         * Is this the proper way to do this in Mithril?
         * It seems like there should be a way to do it without touching
         * the DOM directly
         */
        ChatBoxText.textarea.dom.value = "";
    }
}

module.exports = ChatBoxText;