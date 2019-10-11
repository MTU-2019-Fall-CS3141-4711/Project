var m = require("mithril");

var Icon = require("./Icon");

/*
    Tool selection toolbar
*/
var Toolbar = {

    view: (vnode) => {
        return m("div", {class:"toolbar"},
            m("div", {class:"icon-wrapper"}, [
                //TODO: Real tool icons
                m(Icon,{icon:"fas fa-mouse-pointer"}),
                m(Icon,{icon:"fas fa-paint-brush"}),
                m(Icon,{icon:"fas fa-eraser"})
            ])
        );
    }
}

module.exports = Toolbar;