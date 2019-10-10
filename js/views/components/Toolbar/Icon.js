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
            // <i class="fas fa-mouse-pointer"></i> <-- Mouse pointer
            // <i class="fas fa-paint-brush"></i> <-- Paint Brush
            // <i class="fas fa-eraser"></i> <-- Eraser
            vnode.attrs.icon
        );
    }
}

module.exports = Icon;