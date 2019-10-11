var m = require("mithril");

/*
    Invidual tool icon
*/
var Icon = {
    view: (vnode) => {
        return m("i", {
                class:"icon active-icon " + vnode.attrs.icon,
                onclick: () => { console.log(vnode.attrs.icon + " was clicked"); }
            },
        );
    }
}

module.exports = Icon;