var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");
var VideoQueue = require("./../MainVideoContent/VideoQueue");
var TextBox = require("./Textbox");

function AddToQueue(ytURL, user){
    return 
}
var title="";
let QueueButton = {
    setTitle: (value) =>{
        title = value;
    },
    view: (vnode) =>{
    
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Queue!",
            onclick: () => {
                //console.log("queueueueueueue was clicked");
                VideoQueue.enqueue(title, "Queued by: Username");
            
            }

        });
    
    }
}
module.exports = QueueButton;