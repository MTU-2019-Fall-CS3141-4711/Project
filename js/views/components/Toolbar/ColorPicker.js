var m = require("mithril");

var White = require("./Colors/White");
var Black = require("./Colors/Black");
var Green = require("./Colors/Green");
var Blue = require("./Colors/Blue");
var Red = require("./Colors/Red");
var Yellow = require("./Colors/Yellow");
var Orange = require("./Colors/Orange");
var Purple = require("./Colors/Purple");
var Pink = require("./Colors/Pink");

// make CSS class
var ColorPicker = {
    view: (vnode) =>  {
        return m("section", {class: "chatboxmessage"}, [
            m(White),
            m(Black),
            m(Green),
            m(Blue),
            m(Red),
            m(Yellow),
            m(Orange),
            m(Purple),
            m(Pink)
        ])
    }
}

module.exports = ColorPicker;