let m = require("mithril");
let Button = window.location.hash=="" ? require("./SearchButton") : require("./QueueButton");
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
                
                Button.setTarg(e.target);
                Button.setTitle(e.target.value);
                //setEvent(e);
            },
            onkeypress: function (e) {

                var Queue = require("./../../../models/Queue");

                Button.setTarg(e.target);
                if(e.keyCode==13){

                    if(e.target.value.toLowerCase().startsWith("/")){ // possibly add other '/' commands
                        if(e.target.value.toLowerCase()=="/clear"){
                            Queue.clearQueue();
                            VideoQueue.clearQueue();
                        }
                    }else{
                        if(window.location.hash==""){
                            
                            if(e.target.value!=null && e.target.value!=""){
                                var title = e.target.value.trim();
                                var QueuedVideo = require("./../MainVideoContent/QueuedVideo");
                                title = QueuedVideo.urlSplitter(title); // returns ID
                                if(title.length==11){
                                    var Room = require("./../../Room");
                                    Room.setloadID(title);
                                }
                            }
                            m.route.set("/new");
                        }
                        else {Queue.enqueue(e.target.value);}
                    }
                    
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