var m = require("mithril");

var Pink = {
    view: (vnode) => {
        var Toolbar = require("../Toolbar");
        var ToolbarState = require("../../../../models/ToolbarState");
        return m("input[type=button]", {class: "pink", value: "", 
            onclick: () => {
                Toolbar.COLOR = 0;
                ToolbarState.CURRENTCOLOR = "#FF69B4";
            }    
    })
    }

}

module.exports = Pink;