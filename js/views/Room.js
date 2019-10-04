var m = require("mithril");

var RoomNavigation = require("./components/VideoURLInput/RoomNavigation");

var Room = {

    view: (vnode) => {
        return m("section",{},[
           m(RoomNavigation, {roomid: vnode.attrs.roomid})
        ]);
    }

};

module.exports = Room;