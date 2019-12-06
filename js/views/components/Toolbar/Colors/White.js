var m = require("mithril");

var White = {
    view: (vnode) => {
        var Toolbar = require("../Toolbar");
        var ToolbarState = require("../../../../models/ToolbarState");
        return m("input[type=button]", {class: "white", value: "", 
            onclick: () => {
                Toolbar.COLOR = 0;
                ToolbarState.CURRENTCOLOR = "#FFF";
            }    
    })
    }

}

module.exports = White;