var m = require("mithril");

var PardonButton = {
    view: (vnode) => {
        return m("input[type=button]", {class: "promotebutton", value: "Pardon", 
            onclick: () => {
                var User = require("../../../models/User");
                var ModPopUp = require("./ModPopUp");
                User.pardonUser(ModPopUp.user);
            }    
    })
    }
}
module.exports = PardonButton;