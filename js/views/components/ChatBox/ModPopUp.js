var m = require("mithril");
var BanButton = require("./BanButton");
var PardonButton = require("./PardonButton");
var PromoteButton = require("./PromoteButton");
var DemoteButton = require("./DemoteButton");
var CloseButton = require("./CloseButton");

var ModPopUp = {
    user: "Steve",
    username: "Paul",
    view: (vnode) =>  {
        return m("section", {class: "chatboxmessage"}, [
            m(BanButton),
            m(PardonButton),
            m(PromoteButton),
            m(DemoteButton),
            m(CloseButton)
        ])
    }

}



module.exports=ModPopUp