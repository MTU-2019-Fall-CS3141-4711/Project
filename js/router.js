var m = require("mithril");

var LandingPage = require("./views/LandingPage");
var Room = require("./views/Room");

/* 
    Choose our view(s) based on the URL route and 
    mount it to the body.

    "/" : resolves to the landing page
    "/:rooid" : resolves to a video room of id :roomid
*/
m.route(document.body, "/",{
    "/": LandingPage,
    "/:roomid": {
        render: (vnode) => {
            /* Render the Room view, passing the :roomid as a parameter */
            return m(Room, vnode.attrs);
        }
    }
});