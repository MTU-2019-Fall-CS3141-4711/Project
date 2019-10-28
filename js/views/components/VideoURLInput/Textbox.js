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
                if(e.keyCode==13){
                    //console.log("Enter was hit");
                    if(e.target.value.toLowerCase()=="/clear"){
                        var Queue = require("./../../../models/Queue");
                        Queue.clearQueue();
                        VideoQueue.clearQueue();
                    }
                    console.log(e+" "+ e.target+" "+e.target.value);
                    QueueButton.setTarg(e.target);
                    VideoQueue.enqueue(e.target.value, "Queued by: Username");
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