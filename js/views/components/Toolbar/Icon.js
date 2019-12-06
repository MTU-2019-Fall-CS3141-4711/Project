var m = require("mithril");

var ToolbarState = require("./../../../models/ToolbarState");
var Toolbar = require("./Toolbar");
/*
    Invidual tool icon
*/
var Icon = {
    view: (vnode) => {
        if(typeof vnode.attrs.color == "undefined" || !vnode.attrs.color) {
            return m("i", {
                class:"icon active-icon " + vnode.attrs.icon,
                onclick: () => { ToolbarState.setTool(vnode.attrs.tool); }
            });    
        } else {
            return m("i", {
                class: "icon active-icon " + vnode.attrs.icon, 
                onclick: () => {Toolbar.COLOR = 1;}
            });
        }
        
    }
}

module.exports = Icon;