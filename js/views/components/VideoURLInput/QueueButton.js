var m = require("mithril");

var VideoURLInput = require("./VideoURLInput");

let AddToQueue = {

    view: (vnode) =>{
    
        /* Create an input field of type button */
        return m("input[type=button]", {
            
            /* Button Text */
            value:"Queue!",
            onclick: () => {
                console.log(vnode.attrs.icon + " was clicked");
                
            
            }

        });
    
    }
}
module.exports = AddToQueue;