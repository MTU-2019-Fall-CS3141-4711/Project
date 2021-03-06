var m = require("mithril");

var RoomState = require("./../models/RoomState");
var User = require("./../models/User");
var Chat = require("./../models/Chat");
var Queue = require("../models/Queue");
var Canvas = require("./../models/Canvas");
var YTVideoFrame = require("./../models/YTVideoIframe");
var QueueButton = require("./../views/components/VideoURLInput/QueueButton");
var VideoURLTextbox = require("./../views/components/VideoURLInput/Textbox");

var RoomNavigation = require("./components/VideoURLInput/RoomNavigation");
var Toolbar = require("./components/Toolbar/Toolbar");
var MainVideoContent = require("./components/MainVideoContent/MainVideoContent");
var ChatBox = require("./components/ChatBox/ChatBox");

/* 
    Video viewing room
    Contains:
        - Navigation
            - Room Label
            - Video URL Bar + Button
        Toolbar
            - Canvas tool selection
        MainVideoContent
            - Annotation Canvas
            - Video Player
            - Video Queue
*/
var Room = {
    oninit: (vnode) => {
        RoomState.constructExisting(vnode.attrs.roomid);
        User.construct().then( () => {
            Chat.construct();
            
            Queue.construct();
            // Get URL from landing page textbox
            if(QueueButton.getTitle().length > 0){
                Queue.enqueue(QueueButton.getTitle());
            }

            Canvas.construct();
            YTVideoFrame.construct();
            console.log("Snapshot Listeners Initialized!");
        });
    },
    view: (vnode) => {
        return m("section",{},[

            /* Generate the RoomNavigation vnode, passing it the /:roomid */
            m(RoomNavigation, {roomid: vnode.attrs.roomid}),
            m(Toolbar),
            m(MainVideoContent),
            m(ChatBox)

        ]);
    }

};

module.exports = Room;