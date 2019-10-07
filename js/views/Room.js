var m = require("mithril");

var RoomNavigation = require("./components/VideoURLInput/RoomNavigation");

/* 
    Video viewing room
    Contains:
        - Navigation
            - Room Label
            - Video URL Bar + Button
*/
var Room = {

    view: (vnode) => {
        return m("section",{},[

            /* Generate the RoomNavigation vnode, passing it the /:roomid */
           m(RoomNavigation, {roomid: vnode.attrs.roomid})
        
        ]);
    }

};

module.exports = Room;