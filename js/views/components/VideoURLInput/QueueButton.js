var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");
var VideoQueue = require("./../MainVideoContent/VideoQueue");
var TextBox = require("./Textbox");

function AddToQueue(ytURL, user){
    return 
}

let QueueButton = {

    view: (vnode) =>{
    
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Queue!",
            onclick: () => {
                //console.log("queueueueueueue was clicked");
                VideoQueue.enqueue("Video Title", "Queued by: Username");
            
            }

        });
    
    }
}
module.exports = QueueButton;