var m = require("mithril");

var Home = require("./views/home.js");
var Room = require("./views/room.js");

m.route(document.body, "/",{
    "/": Home,
    "/:roomid": {
        render: (vnode) => {
            return m(Room, vnode.attrs);
        }
    }
});