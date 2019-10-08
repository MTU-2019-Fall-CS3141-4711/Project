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
                m(Icon,{icon:"S"}),
                m(Icon,{icon:"P"}),
                m(Icon,{icon:"E"})
            ])
        );
    }
}

module.exports = Toolbar;