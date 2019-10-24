var m = require("mithril");

var Firebase = require("firebase/app");

// Initialize Cloud Firestore through Firebase
Firebase.initializeApp({
    apiKey: 'AIzaSyDs-rZyScasOYHskDQm-y_c0BskHuoaKXA',
    authDomain: ' youtwobe-video-viewer.firebaseapp.com ',
    projectId: 'youtwobe-video-viewer'
});

var User = require("./models/User");

var LandingPage = require("./views/LandingPage");
var LoadingPage = require("./views/LoadingPage");
var Room = require("./views/Room");
var Chat = require("./models/Chat");
Chat.construct();
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

            if(!User.isUserSignedIn()){
               m.route.set("/" + vnode.attrs.roomid + "/loading");
            }
            User.construct();
            
            /* Render the Room view, passing the :roomid as a parameter */
            return m(Room, vnode.attrs);
        }
    },
    "/:roomid/loading": {
        render: (vnode) =>{
            
            if(User.isUserSignedIn()){
                m.route.set("/" + vnode.attrs.roomid);
                return;
            }

            User.signIn().then( () => {
                m.route.set("/" + vnode.attrs.roomid);
                return;
            }).catch( (error) =>{
                console.log(error);
            });

            return m(LoadingPage);
        }
    }
});