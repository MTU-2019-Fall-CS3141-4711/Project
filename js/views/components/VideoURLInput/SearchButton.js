let m = require("mithril");
/* Button next to textbox to create viewing room */

var targ = null;
var title="";
let SearchButton = {
    setTitle: (value) =>{
        title = value.trim();
    },
    setTarg: (value) =>{
        targ = value;
    },
    view: () =>{
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Watch!",
            onclick: () => {
                if(title!=null && title!=""){
                    var QueuedVideo = require("./../MainVideoContent/QueuedVideo");
                    title = QueuedVideo.urlSplitter(title); // returns ID
                    if(title.length==11){
                        var Room = require("./../../Room");
                        Room.setloadID(title);
                    }
                }
                
                
                /* Redirect the user to /:roomid */
                m.route.set("/new");
            
            }

        });
    
    }
}

module.exports = SearchButton;