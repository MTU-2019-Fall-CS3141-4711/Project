var m = require("mithril");

var ToolbarState = require("./../../../models/ToolbarState");
var User = require("../../../models/User");
/*
    Invidual tool icon
*/
var RemoveVideoButton = {
    view: (vnode) => {
        return m("i", {
                class:"icon active-icon " + vnode.attrs.icon,
                onclick: () => { 
                    if(!User.isModdedFunc()){return;}
                    ToolbarState.setTool(vnode.attrs.tool); }
            },
        );
    }
}

module.exports = RemoveVideoButton;