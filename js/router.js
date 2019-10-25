var m = require("mithril");

var Firebase = require("firebase/app");

// Initialize Cloud Firestore through Firebase
Firebase.initializeApp({
    apiKey: 'AIzaSyDs-rZyScasOYHskDQm-y_c0BskHuoaKXA',
    authDomain: ' youtwobe-video-viewer.firebaseapp.com ',
    projectId: 'youtwobe-video-viewer'
});

var RoomState = require("./models/RoomState");
var Session = require("./models/Session");

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
    "/new": {
        render: () => {

            // Check if user has session
            if(Session.isInitialized()){

                console.log("Session Initialized!");

            }else{

                // Create a session if they doesn't exist
                sessionSetup().then( () => {
                    RoomState.createNew().then( () => {
                        
                        /**
                         * TO PUT HERE: Construct Firestore snapshot listeners
                         */


                        // Send the user to the room once it's ready
                        m.route.set("/" + RoomState.Room_ID);
                        return;
    
                    }).catch( (err) => {
                        // TODO: Return an error page
                    });

                }).catch(() => {
                    // TODO: Return an error page
                    console.log("Error creating session");
                });

            }

            // Show a pretty loading page while we wait
            return m(LoadingPage);

        }
    },
    "/:roomid": {
        render: (vnode) => {
            // Check if user has session
            if(Session.isInitialized()){
                // Render the room if they have a session
                return m(Room, vnode.attrs);

            }else{
                sessionSetup().then( () => {
                    // User is signed in, construct existing room
                    RoomState.constructExisting(vnode.attrs.roomid);
                    m.redraw();
    
                }).catch(() => {
                    // TODO: Return an error page
    
                });

            }

            // Display loading page if user has no session
            return m(LoadingPage);
        }
    },
    "/:roomid/loading": {
        render: (vnode) => {
            // Check if user has session
            if(Session.isInitialized()){
                // Send them back to room if they do
                m.route.set("/" + vnode.roomid);
                return;
            }

            // Create one if they don't
            sessionSetup().then( () => {
                // Send them back to room when the session is ready
                m.route.set("/" + vnode.roomid);
                return;

            }).catch(() => {
                // TODO: Return an error page
            });

            // Display loading page if user has no session
            return m(LoadingPage);
        }
    }
});

/**
 * Check that we have a trackable session.
 * Returns a promise to resolve once we do have a session
 */
function sessionSetup(roomid){
    return new Promise( (resolve, reject) => {

        Session.start().then( () => {
            console.log("Session Initialized!");
            resolve();
            return;
        }).catch((err) => {
            //Eventually this should print something to an error display
            console.log("Error creating session");
            reject();
        });

    });
}