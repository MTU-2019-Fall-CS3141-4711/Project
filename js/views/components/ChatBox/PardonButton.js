var m = require("mithril");

var PardonButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "promotebutton", value: "Pardon", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                var Chat = require("../../../models/Chat");
                User.pardonUser(ModPopUp.user);
                pardoneduser = ModPopUp.username;
                message = " has been pardoned.";
                message = pardoneduser + message;
                Chat.sendMessage(message, "informative");
            }    
    })
    }
}
module.exports = PardonButton;