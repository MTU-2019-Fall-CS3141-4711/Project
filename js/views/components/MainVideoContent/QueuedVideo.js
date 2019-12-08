var m = require("mithril");
var Icon = require("../Toolbar/Icon");

/*
    Video in playback queue with inline moderation controls
*/
/**
 * TODO: get YouTube data API
 * To get the YT title (and description) we need to use the data api
 */
var QueuedVideo = {
    view: (vnode) => {
        
        videoID = "https://www.youtube.com/watch?v="+ vnode.attrs.videoID;
        user = vnode.attrs.queueUser;
        if(videoID.length!=11){
            return; // if ID is in any way, invalid, we do not do anything.
        }
        
        return m("div", {class: "queued-video"},[
            m("img", { // contains the image 
                /*
                    if YouTube video isn't defined, then it will desplay the default gray YouTube "thumbnail not found" thumbnail
                 */
                "src":"https://i.ytimg.com/vi/"+videoID+"/mqdefault.jpg","alt":"Queued Video","height":"52","width":"92.44"
            }),
            m("div", {"class":"text-container"},[ // contains the following two text elements
                m("div", {"class":"video-title"}, videoID),
                m("div", {"class":"queued-by"}, user),
                m(Icon,{icon: "far fa-times-circle", align: "float: right; margin: 0px 0px 0px 55vw"})
                
            ])
        ]);
    }
}

module.exports = QueuedVideo;