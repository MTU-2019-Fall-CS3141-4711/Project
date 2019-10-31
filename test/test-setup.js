/**
 * Initialize the environment
*/
    var jsdom = require("jsdom");

    //Firebase needs to load all of it's stuff before we point to JSDOM or else it breaks enviromental checks and fails
    var Firebase = require("@firebase/testing");
    require("firebase");
    require("firebase/firestore");
    require("firebase/auth");
    require("firebase/database");

    // Create a fake DOM to render & test
    dom = new jsdom.JSDOM("<!DOCTYPE HTML><html><head></head><body><div id='player'></div></body></html>", {
        pretendToBeVisual:true
    });

    // Point everything to the fake DOM
    global.window = dom.window;
    global.document = dom.window.document;
    global.requestAnimationFrame = dom.window.requestAnimationFrame;

    // Initialize Cloud Firestore through Firebase
    Firebase.initializeTestApp({
        projectId: "youtwobe-video-viewer",
        auth: {uid: "fakeuser001", display_name:"Joshua", email:"joshua@wopr.mil"}
    });

    //Make sure Mithril loads properly in fake DOM.
    require("mithril");

/**
 * Setup the tests
 */

    /*
        Things to call before the tests run
    */
    before(async () => {
        // Make sure the database is empty before we start testing
        await Firebase.clearFirestoreData({ projectId:"youtwobe-video-viewer" });
    });

    /*
        Things to call after the tests run
    */
    after(async () =>{
        // Clear all the projects once we're done.
        await Promise.all(Firebase.apps().map(app => app.delete()));
    })