var m = require("mithril");

/*
    Invidual tool icon
*/
var Icon = {
    view: (vnode) => {
        if(typeof vnode.attrs.color == "undefined" || !vnode.attrs.color) {
            return m("i", {
                class:"icon active-icon " + vnode.attrs.icon,
                onclick: () => { 
                    var ToolbarState = require("./../../../models/ToolbarState");
                    ToolbarState.setTool(vnode.attrs.tool); 
                }
            });    
        } else {
            return m("i", {
                class: "icon active-icon " + vnode.attrs.icon, 
                onclick: () => {
                    var Toolbar = require("./Toolbar");
                    Toolbar.COLOR = 1; 
                }
            });
        }
        
    }
}

module.exports = Icon;