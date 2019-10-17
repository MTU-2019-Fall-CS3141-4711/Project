let m = require("mithril");

/* Textbox at top of page for video URL */
let Textbox = {
    getText: () =>{
        return document.getElementById("URLInput").nodeValue;
    },
    /* Create input of type text */
    view: (vnode) =>{
        return m("input[type=text]", {

            /* The light grey helper text in the text box */
            id: "URLInput",
            placeholder:"Enter a YouTube URL"
            
        });
    }
}

module.exports = Textbox;