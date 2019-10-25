var m = require("mithril");

var Chat = require("./../../../models/Chat");

var ChatBoxText = {
    textarea: null,
    view: () => {
        ChatBoxText.textarea = m("textarea", {class:"chatboxtext",
            onkeyup: (e) => {
                if(e.keyCode == 13){
                    Chat.sendMessage( ChatBoxText.getTextAreaMessage() );
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