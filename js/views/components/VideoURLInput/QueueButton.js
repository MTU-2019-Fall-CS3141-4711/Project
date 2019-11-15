var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");
var VideoQueue = require("./../MainVideoContent/VideoQueue");


var targ = null;
var title="";
let QueueButton = {
    setTitle: (value) =>{
        title = value.trim();
    },
    setTarg: (value) =>{
        targ = value;
    },
    view: (vnode) =>{
    
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Queue!",
            onclick: (e) => {
                var Queue = require("./../../../models/Queue");
                var TextBox = require("./Textbox");
                if(title.toLowerCase().startsWith("/")){ // possibly add other '/' commands
                    if(title.toLowerCase()=="/clear"){
                        Queue.clearQueue();
                        VideoQueue.clearQueue();
                    }
                }else{
                    title=title.trim();
                    if(title.length!=0){
                        Queue.enqueue(title);
                    }
                }
                TextBox.clear(targ);
            },
            /*
                onKeyPress ---- Keycode == 13
            */
           

        });
    
    }
}
module.exports = QueueButton;