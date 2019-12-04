var m = require("mithril");

var Black = {
    view: (vnode) => {
        var Toolbar = require("../Toolbar");
        var ToolbarState = require("../../../../models/ToolbarState");
        return m("input[type=button]", {class: "black", value: "", 
            onclick: () => {
                Toolbar.COLOR = 0;
                ToolbarState.CURRENTCOLOR = "#000";
            }    
    })
    }

}

module.exports = Black;