let m = require("mithril");

let Textbox = require("./Textbox");
let SearchButton = require("./SearchButton");

let VideoURLInput = {
    view: ()=>{
        return m("", {class:"VideoURLInput"},
            m("", {class:"wrapper"},[
                m(Textbox),
                m(SearchButton)
            ])
        );
    }
}

module.exports = VideoURLInput;