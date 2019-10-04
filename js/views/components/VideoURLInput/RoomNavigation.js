var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");

var RoomNavigation = {
    view: (vnode) =>{
        return m("navigation", {class:"RoomNavigation"},[
            m("span", {class:"RoomLabel"}, vnode.attrs.roomid),
            m("span", {class:"VideoURLInput"}, m(VideoURLInput))
        ]);
    }
};

module.exports = RoomNavigation;