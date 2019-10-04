var m = require("mithril");

var LandingPage = require("./views/LandingPage");
var Room = require("./views/room.js");

m.route(document.body, "/",{
    "/": LandingPage,
    "/:roomid": {
        render: (vnode) => {
            return m(Room, vnode.attrs);
        }
    }
});