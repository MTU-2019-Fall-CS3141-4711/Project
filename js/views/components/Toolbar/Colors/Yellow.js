var m = require("mithril");

var Yellow = {
    view: (vnode) => {
        var Toolbar = require("../Toolbar");
        var ToolbarState = require("../../../../models/ToolbarState");
        return m("input[type=button]", {class: "yellow", value: "", 
            onclick: () => {
                Toolbar.COLOR = 0;
                ToolbarState.CURRENTCOLOR = "#FF0";
            }    
    })
    }

}

module.exports = Yellow;