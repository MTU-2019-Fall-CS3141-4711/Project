var m = require("mithril");

var ToolbarState = require("./../../../models/ToolbarState");

var White = require("./Colors/White");
var Black = require("./Colors/Black");
var Green = require("./Colors/Green");
var Blue = require("./Colors/Blue");
var Red = require("./Colors/Red");
var Yellow = require("./Colors/Yellow");
var Orange = require("./Colors/Orange");
var Purple = require("./Colors/Purple");
var Pink = require("./Colors/Pink");

/*
    Tool selection toolbar
*/
var Toolbar = {
    COLOR: 0,
    oninit: () => {
        ToolbarState.construct();
    },
    view: (vnode) => {
        var Canvas = require("./../../../models/Canvas");
        var Icon = require("./Icon");
        if(Toolbar.COLOR == 0) {
            return m("div", {class:"toolbar"},
                m("div", {class:"icon-wrapper"}, [
                    m(Icon,{icon:"fas fa-mouse-pointer", tool: ToolbarState.POINTER}),
                    m(Icon,{icon:"fas fa-paint-brush", tool: ToolbarState.BRUSH}),
                    m(Icon,{icon:"fas fa-eraser", tool: ToolbarState.ERASER}),
                    m(Icon, {icon:"fas fa-palette", color: true}),
                    m("i", {
                        class: "icon active-icon fas fa-bullseye",
                        style: "color: red;",
                        onclick: () => { Canvas.clearCanvas(); }
                    })
                ])
            );
        } else if(Toolbar.COLOR == 1) {
            return m("div", {class: "toolbar"} ,
            m("div", {class: "icon-wrapper"}, [
                m(White),
                m(Black),
                m(Green),
                m(Blue),
                m(Red),
                m(Yellow),
                m(Orange),
                m(Purple),
                m(Pink)
            ]));
        }
        
    }
}

module.exports = Toolbar;