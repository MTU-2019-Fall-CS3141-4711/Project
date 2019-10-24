var m = require("mithril");

var Firebase = require("firebase/app");

// Initialize Cloud Firestore through Firebase
Firebase.initializeApp({
    apiKey: 'AIzaSyDs-rZyScasOYHskDQm-y_c0BskHuoaKXA',
    authDomain: ' youtwobe-video-viewer.firebaseapp.com ',
    projectId: 'youtwobe-video-viewer'
});

var RoomState = require("./models/RoomState");
var User = require("./models/User");

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
    "/new": {
        render: (vnode) => {

            // Make sure user is authenticated so we can track their usage
            if(User.isUserSignedIn()){
                //Create the room and redirect when done
                RoomState.createNew().then( () => {
                    m.route.set("/" + RoomState.Room_ID);
                    return;
                }).catch( (err) => {
                    console.log("Error creating room");
                });
            // Login the user
            }else{
                User.signIn().then( () => {
                    // Re render the page witch shoulds end us to true in this conditional
                    m.redraw();
                    return;
                }).catch( (error) =>{
                    console.log(error);
                });
            }

            // Show a pretty loading page while we wait
            return m(LoadingPage);

        }
    },
    "/:roomid": {
        render: (vnode) => {

            if(!User.isUserSignedIn()){
               m.route.set("/" + vnode.attrs.roomid + "/loading");
            }
            RoomState.constructExisting(vnode.attrs.roomid);
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