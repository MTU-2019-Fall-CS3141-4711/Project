/**
 * Initialize the environment
*/
    var jsdom = require("jsdom");

    //Firebase needs to load all of it's stuff before we point to JSDOM or else it breaks enviromental checks and fails
    var Firebase = require("firebase/app");
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
    Firebase.initializeApp({
        apiKey: 'AIzaSyDs-rZyScasOYHskDQm-y_c0BskHuoaKXA',
        authDomain: ' youtwobe-video-viewer.firebaseapp.com ',
        projectId: 'youtwobe-video-viewer',
        databaseURL: "https://youtwobe-video-viewer.firebaseio.com/"
    });
    //Make sure Mithril loads properly in fake DOM.
    require("mithril");
    var Session = require("./../js/models/Session");
    var RoomState = require("./../js/models/RoomState");
    var User = require("./../js/models/User");
    var Chat = require("./../js/models/Chat");
    var Queue = require("./../js/models/Queue");
/**
 * Setup the tests
 */

    before(async function (){
        await Session.start();
        await RoomState.createNew();
        await User.construct().then( () => {
            Chat.construct();
            Queue.construct();
        });

    });

    /*
        Things to call before the tests run
    */
    beforeEach(function () {


    });

    /*
        Things to call after the tests run
    */
    after(async () =>{
        
    })