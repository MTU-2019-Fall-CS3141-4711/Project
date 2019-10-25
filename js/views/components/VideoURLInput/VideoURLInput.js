let m = require("mithril");

let Textbox = require("./Textbox");
let SearchButton = require("./SearchButton");
let QueueButton = require("./QueueButton")

/*
    Textbox and button for entering a URL and creating a 
    viewing room to watch the video
*/
function onLandingPage(){
      if(window.location.hash==""){ // checks whether the URL has a '#'
          return m(SearchButton);
      }else{
          return m(QueueButton); 
      }
}
//console.log(onLandingPage());
let VideoURLInput = {
    view: ()=>{
        return m("", {class:"VideoURLInput"},
            m("", {class:"wrapper"},[
                /* Create vnodes for the textbox and search button */
                m(Textbox),
                onLandingPage()
            ])
        );
    }
}

module.exports = VideoURLInput;