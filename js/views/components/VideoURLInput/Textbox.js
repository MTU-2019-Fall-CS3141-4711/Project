let m = require("mithril");
let RoomState = require("../../../models/RoomState");
let QueueButton = require("./QueueButton");
let VideoQueue = require("./../MainVideoContent/VideoQueue");

var ev = null;

/* Textbox at top of page for video URL */
let Textbox = {
    clear: (eventTarget) =>{
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
                QueueButton.setTarg(e.target);
                if(e.keyCode==13 && RoomState.Room_ID != null){
                    if(e.target.value.toLowerCase().startsWith("/")){ // possibly add other '/' commands
                        if(e.target.value.toLowerCase()=="/clear"){
                            Queue.clearQueue();
                            VideoQueue.clearQueue();
                        }
                    }else{
                        Queue.enqueue(e.target.value, "Username");
                    }
                    
                    Textbox.clear(e.target);
                }

                // Create a new room if we're not in a room
                if(e.keyCode == 13 && RoomState.Room_ID ==  null){
                    /* Redirect the user to /:roomid */
                    m.route.set("/new");   
                }
            },
            
            
            

            /* The light grey helper text in the text box */
            id: "URLInput",
            placeholder:"Enter a YouTube URL"
            
        });
    }
}

module.exports = Textbox;