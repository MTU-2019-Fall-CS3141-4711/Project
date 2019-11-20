var m = require("mithril");

var PromoteButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "promotebutton", value: "Promote", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                var Chat = require("../../../models/Chat");
                User.promoteUser(ModPopUp.user);
                promoteduser = ModPopUp.username;
                message = " has been promoted.";
                message = promoteduser + message;
                Chat.sendMessage(message, "informative");
            }    
    })
    }
}
module.exports = PromoteButton;