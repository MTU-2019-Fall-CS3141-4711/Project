let m = require("mithril");
/* Button next to textbox to create viewing room */
var randomSlice = Math.round(Math.random() * 4 - 2);
var randomKey = Math.random().toString(36).slice(2, 10+randomSlice);
let SearchButton = {

    view: () =>{
    
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Watch!",
            onclick: () => {
                
                /* Redirect the user to /:roomid */
                m.route.set("/"+ randomKey);
            
            }

        });
    
    }
}

module.exports = SearchButton;