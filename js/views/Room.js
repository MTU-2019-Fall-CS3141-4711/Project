var m = require("mithril");

var RoomState = require("./../models/RoomState");
var User = require("./../models/User");
var Chat = require("./../models/Chat");
var Queue = require("../models/Queue");

var RoomNavigation = require("./components/VideoURLInput/RoomNavigation");
var Toolbar = require("./components/Toolbar/Toolbar");
var MainVideoContent = require("./components/MainVideoContent/MainVideoContent");
var ChatBox = require("./components/ChatBox/ChatBox");

var YTVideIframe = require("../models/YTVideoIframe");

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
var loadUrlID = "M7lc1UVf-VE";
var Room = {
    setloadID: (loadID) =>{
        loadUrlID = loadID;
    },
    oninit: (vnode) => {
        RoomState.constructExisting(vnode.attrs.roomid);
        User.construct().then( () => {
            Chat.construct();
            Queue.construct();
            console.log("Snapshot Listeners Initialized!");
        })
    },
    oncreate: () => {
        YTVideIframe.enableDisplay();
        YTVideIframe.loadVideo(loadUrlID);
        YTVideIframe.stopPlayer();
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