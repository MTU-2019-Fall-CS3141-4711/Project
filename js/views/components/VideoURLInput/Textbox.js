let m = require("mithril");

/* Textbox at top of page for video URL */
let Textbox = {

    /* Create input of type text */
    view: () =>{
        return m("input[type=text]", {

            /* The light grey helper text in the text box */
            placeholder:"Enter a YouTube URL"
        
        });
    }
}

module.exports = Textbox;