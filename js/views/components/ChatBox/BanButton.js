var m = require("mithril");

var BanButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "banbutton", value: "Ban", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                var Chat = require("../../../models/Chat");
                User.banUser(ModPopUp.user);
                User.demoteUser(ModPopUp.user);
                banneduser = ModPopUp.username;
                message = " has been banned.";
                message = banneduser + message;
                Chat.sendMessage(message, "informative");
                
            }    
    })
    }
}
module.exports = BanButton;