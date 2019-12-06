var m = require("mithril");
var Icon = require("../Toolbar/Icon");


/*
    Video in playback queue with inline moderation controls
*/
// Default YouTube Thumbnail URL (standard definition)
// https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
var title ="";
var user = "";
function urlsplitter(YTUrl){
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
    
    //console.log(video_id+"\n");

    var ampersandPosition = video_id.indexOf('&');  // if there's an ampersand, we stop at the ampersand
    //console.log(video_id + ": " + ampersandPosition);
    //console.log(video_id+"\n"+ampersandPosition);
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    if(video_id.length!=11){
        return "YouTube ID not found";
    }
    return video_id
}
// function getTitleFrom(YTid){
//     var YTtitle = "";
//     $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+ YTid +'?v=2&alt=jsonc', function(data,status,xhr){
//         var yt_response = data.data, // If you need more video informations, take a look on this response: data.data
//             yt_title = yt_response.title,
//             yt_duration = formatSecondsAsTime( yt_response.duration );
//             YTtitle = yt_title;
//     }); 
//     return YTtitle;
// }
/**
 * TODO: get YouTube data API
 * To get the YT title (and description) we need to use the data api
 */
var videoURL = "";
var QueuedVideo = {
    view: (vnode) => {
        
        
        videoID = urlsplitter(vnode.attrs.videoTitle);
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
                m("div", {"class":"queued-by"}, user),
                m(Icon,{icon: "far fa-times-circle", align: "float: right; margin: 0px 0px 0px 55vw", onclick: () => {
                    var User = require("../../../models/User");
                    if(User.isModerator) {
                        // delete video
                        var Queue = require("../../../models/Queue");
                        Queue.remove(vnode.attrs.videoID);
                    }
                }})
                
            ])
        ]);
    }
}

module.exports = QueuedVideo;
