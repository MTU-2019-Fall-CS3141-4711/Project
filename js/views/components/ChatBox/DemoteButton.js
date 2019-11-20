var m = require("mithril");

var DemoteButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "demotebutton", value: "Demote", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                var Chat = require("../../../models/Chat");
                User.demoteUser(ModPopUp.user);
                demoteduser = ModPopUp.username;
                message = " has been demoted.";
                message = demoteduser + message;
                Chat.sendMessage(message, "informative");
            }    
    })
    }
}
module.exports = DemoteButton;