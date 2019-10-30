var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");
var VideoQueue = require("./../MainVideoContent/VideoQueue");


var targ = null;
var title="";
let QueueButton = {
    setTitle: (value) =>{
        title = value;
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
                console.log("QueueButton(vnode).onclick(e) executed");
                var Queue = require("./../../../models/Queue");
                var TextBox = require("./Textbox");
                if(title.toLowerCase().startsWith("/")){ // possibly add other '/' commands
                    if(title.toLowerCase()=="/clear"){
                        Queue.clearQueue();
                        VideoQueue.clearQueue();
                    }
                }else{
                    //VideoQueue.enqueue(title, "Username"); // TODO: grab current user
                    console.log("Queue.enqueue called from QueueButton");
                    Queue.enqueue(title, "Username");
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