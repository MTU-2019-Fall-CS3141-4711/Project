var jsdom = require("jsdom");

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

after(function(){
    dom.window.close()
});