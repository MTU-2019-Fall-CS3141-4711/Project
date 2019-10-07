let m = require("mithril");

/* Button next to textbox to create viewing room */
let SearchButton = {

    view: () =>{
    
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Watch!",
            onclick: () => {
                
                /* Redirect the user to /:roomid */
                m.route.set("/a1b2c3d4e5");
            
            }

        });
    
    }
}

module.exports = SearchButton;