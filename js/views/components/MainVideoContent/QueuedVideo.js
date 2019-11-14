var m = require("mithril");

/*
    Video in playback queue with inline moderation controls
*/
// Default YouTube Thumbnail URL (standard definition)
// https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg

/**
 * TODO: get YouTube data API
 * To get the YT title (and description) we need to use the data api
 */
var videoURL = "";
var QueuedVideo = {
    urlSplitter: (YTUrl) =>{
        if(YTUrl==null){
            return "YouTube ID is undefined";
        }
        else if(YTUrl.includes("youtu.be/")){                //DON'T FORGET THE '/'
            //console.log("contains .be/");
           var idArray = YTUrl.split('be/');
        }else if(YTUrl.includes("?v=")){
            //console.log("contains ?v=");
            var idArray = YTUrl.split('?v=');
        }else{
            return "YouTube ID not found";
        }
        var video_id = idArray[1];                      // takes everything past 'v=' or be/
    
        var ampersandPosition = video_id.indexOf('&');  // if there's an ampersand, we stop at the ampersand
        
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        if(video_id.length!=11){
            return "YouTube ID not found";
        }
        return video_id
    },
    view: (vnode) => {
        
        
        videoID = QueuedVideo.urlsplitter(vnode.attrs.videoTitle);
        videoURL = "https://www.youtube.com/watch?v="+videoID;
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
                m("div", {"class":"queued-by"}, user)
            ])
        ]);
    }
}

module.exports = QueuedVideo;
