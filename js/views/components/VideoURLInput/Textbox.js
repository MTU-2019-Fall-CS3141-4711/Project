let m = require("mithril");
let QueueButton = require("./QueueButton");
let VideoQueue = require("./../MainVideoContent/VideoQueue");

var ev = null;

/* Textbox at top of page for video URL */
let Textbox = {
    clear: (eventTarget) =>{
        console.log(eventTarget.value);
        eventTarget.value="";
        m.redraw();
    },
    setEvent: (event)=>{
        ev = event;
    },
    getEvent:()=>{
        return ev;
    }
    ,
    /* Create input of type text */
    view: (vnode) =>{
        return m("input[type=text]", {
            oninput: function (e) {
                
                QueueButton.setTarg(e.target);
                QueueButton.setTitle(e.target.value);
                //setEvent(e);
            },
            onkeypress: function (e) {
                var Queue = require("./../../../models/Queue");
                console.log(e+" "+ e.target+" "+e.target.value);
                QueueButton.setTarg(e.target);
                if(e.keyCode==13){
                    //console.log("Enter was hit");
                    if(e.target.value.toLowerCase()=="/clear"){
                        Queue.clearQueue();
                        VideoQueue.clearQueue();
                    }else{
                        Queue.enqueue(e.target.value, "Username");
                    }
                    
                    //VideoQueue.enqueue(e.target.value, "Username"); // TODO: pull username from firebase
                    Textbox.clear(e.target);
                }
            },
            
            
            

            /* The light grey helper text in the text box */
            id: "URLInput",
            placeholder:"Enter a YouTube URL"
            
        });
    }
}

module.exports = Textbox;