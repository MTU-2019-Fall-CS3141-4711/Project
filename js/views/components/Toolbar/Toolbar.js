var m = require("mithril");

var ToolbarState = require("./../../../models/ToolbarState");

var Icon = require("./Icon");

/*
    Tool selection toolbar
*/
var Toolbar = {
    oninit: () => {
        ToolbarState.construct();
    },
    view: (vnode) => {
        return m("div", {class:"toolbar"},
            m("div", {class:"icon-wrapper"}, [
                m(Icon,{icon:"fas fa-mouse-pointer", tool: ToolbarState.POINTER}),
                m(Icon,{icon:"fas fa-paint-brush", tool: ToolbarState.BRUSH}),
                m(Icon,{icon:"fas fa-eraser", tool: ToolbarState.ERASER}),
                m(Icon, {icon:"fas fa-palette", tool: ToolbarState.COLOR})
            ])
        );
    }
}

module.exports = Toolbar;