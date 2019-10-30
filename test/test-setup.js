var jsdom = require("jsdom");

//Firebase needs to load all of it's stuff before we point to JSDOM or else it breaks enviromental checks and fails
var Firebase = require("firebase/app");
require("firebase");

 // Create a fake DOM to render & test
 dom = new jsdom.JSDOM("<!DOCTYPE HTML><html><head></head><body><div id='player'></div></body></html>", {
    pretendToBeVisual:true
});

// Point everything to the fake DOM
global.window = dom.window;
global.document = dom.window.document;
global.requestAnimationFrame = dom.window.requestAnimationFrame;

//Make sure Mithril loads properly in fake DOM.
require("mithril");