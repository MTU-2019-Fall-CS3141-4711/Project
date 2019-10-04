let m = require("mithril");

let Textbox = {
    view: () =>{
        return m("input[type=text]", {
            placeholder:"Enter a YouTube URL"
        });
    }
}

module.exports = Textbox;