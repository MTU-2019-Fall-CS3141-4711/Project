var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");

/* 
    Navigation bar at the top of the room page
    Contains:
        - Textbox for video URLs
        - Button to queue video
*/
var RoomNavigation = {
    view: (vnode) =>{

        return m("navigation", {class:"RoomNavigation"},[

            /* Display room ID in the label in the top left */
            m("span", {class:"RoomLabel"}, vnode.attrs.roomid),

            /* Display the textbox and Queue button in the center */
            m("span", {class:"VideoURLInput"}, m(VideoURLInput))

        ]);
        
    }
};

module.exports = RoomNavigation;