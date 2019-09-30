var m = require("mithril");

var Room = {

    view: (vnode) => {
        return m("h1",{style:"margin:auto;"}, vnode.attrs.id)
    }

};

module.exports = Room;