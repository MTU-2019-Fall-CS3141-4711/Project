let m = require("mithril");
let QueueButton = require("./QueueButton");

input="";
/* Textbox at top of page for video URL */
let Textbox = {
    
    setInput: function(value){
        input = value;
    },
    /* Create input of type text */
    view: (vnode) =>{
        return m("input[type=text]", {
            oninput: function (e) {
                QueueButton.setTitle(e.target.value);
            },

            /* The light grey helper text in the text box */
            id: "URLInput",
            placeholder:"Enter a YouTube URL"
            
        });
    }
}

module.exports = Textbox;