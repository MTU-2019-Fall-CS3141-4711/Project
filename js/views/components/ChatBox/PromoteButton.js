var m = require("mithril");

var PromoteButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "promotebutton", value: "Promote", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                User.promoteUser(ModPopUp.user);
            }    
    })
    }
}
module.exports = PromoteButton;