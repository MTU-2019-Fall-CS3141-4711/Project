let m = require("mithril");

let Textbox = require("./Textbox");
let SearchButton = require("./SearchButton");

/*
    Textbox and button for entering a URL and creating a 
    viewing room to watch the video
*/
let VideoURLInput = {
    view: ()=>{
        return m("", {class:"VideoURLInput"},
            m("", {class:"wrapper"},[
                /* Create vnodes for the textbox and search button */
                m(Textbox),
                m(SearchButton)
            ])
        );
    }
}

module.exports = VideoURLInput;