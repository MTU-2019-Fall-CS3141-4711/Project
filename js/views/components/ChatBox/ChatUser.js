var m = require("mithril");
var RoomState = require("../../../models/RoomState");
var User = require("../../../models/User");
var Session = require("../../../models/Session");

var ChatUser = {
    view: (vnode) => {
        return m("input[type=button]", {class:"chatuserbutton", value: RoomState.users[vnode.attrs.userid],
            onclick: () => {
            if(User.isModerator && vnode.attrs.userid != Session.getUid()){
                var ModPopUp = require("./ModPopUp");
                var ChatBox = require("./ChatBox");
                ChatBox.ChatTab = 2;
                ModPopUp.user = vnode.attrs.userid;
            }
        }});
    }
}

module.exports = ChatUser;