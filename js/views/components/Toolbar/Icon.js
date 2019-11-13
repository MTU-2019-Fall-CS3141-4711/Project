var m = require("mithril");

var ToolbarState = require("./../../../models/ToolbarState");
/*
    Invidual tool icon
*/
var Icon = {
    view: (vnode) => {
        return m("i", {
                class:"icon active-icon " + vnode.attrs.icon,
                onclick: () => { ToolbarState.setTool(vnode.attrs.tool); }
            },
        );
    }
}

module.exports = Icon;