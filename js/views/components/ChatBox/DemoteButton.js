var m = require("mithril");

var DemoteButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "demotebutton", value: "Demote", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                User.demoteUser(ModPopUp.user);
            }    
    })
    }
}
module.exports = DemoteButton;