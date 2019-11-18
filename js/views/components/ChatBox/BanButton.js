var m = require("mithril");

var BanButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "banbutton", value: "Ban", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                User.banUser(ModPopUp.user);
                
            }    
    })
    }
}
module.exports = BanButton;