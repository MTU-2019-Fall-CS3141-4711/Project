var m = require("mithril");

var Red = {
    view: (vnode) => {
        var Toolbar = require("../Toolbar");
        var ToolbarState = require("../../../../models/ToolbarState");
        return m("input[type=button]", {class: "red", value: "", 
            onclick: () => {
                Toolbar.COLOR = 0;
                ToolbarState.CURRENTCOLOR = "#F00"
            }    
    })
    }

}

module.exports = Red;