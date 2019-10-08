var m = require("mithril");

/*
    Invidual tool icon
*/
var Icon = {
    view: (vnode) => {
        return m("span", {
                class:"icon active-icon",
                onclick: () => { console.log(vnode.attrs.icon + " was clicked"); }
            },
            //TODO: Font-awesome(?) icon here
            vnode.attrs.icon
        );
    }
}

module.exports = Icon;