var m = require("mithril");

var Queue = require("../../../models/Queue");
var User = require("../../../models/User");
/*
    Video in playback queue with inline moderation controls
*/
/**
 * TODO: get YouTube data API
 * To get the YT title (and description) we need to use the data api
 */
var QueuedVideo = {
    view: (vnode) => {
        // Quick way to hide the X if they're not a mod
        // TODO: Use a propery condition to generate the vnode because this is ambigious.
        let hideQueueModeration = "display:none";
        if(User.isModerator){ hideQueueModeration = "display: inline;"}

        return m("div", {class: "queued-video"},[
            m("img", { // contains the image 
                /*
                    if YouTube video isn't defined, then it will desplay the default gray YouTube "thumbnail not found" thumbnail
                 */
                "src":"https://i.ytimg.com/vi/"+vnode.attrs.videoID+"/mqdefault.jpg","alt":"Queued Video","height":"52","width":"92.44"
            }),
            m("div", {"class":"text-container"},[ // contains the following two text elements
                m("div", {"class":"video-title"}, vnode.attrs.videoID),
                m("div", {"class":"queued-by"}, vnode.attrs.queueUser),
                m("i",{
                    class: "far fa-times-circle", 
                    style: "cursor:pointer;" + hideQueueModeration,
                    onclick: () =>{
                        Queue.remove(vnode.attrs.docId);
                    }
                })
                
            ])
        ]);
    }
}

module.exports = QueuedVideo;