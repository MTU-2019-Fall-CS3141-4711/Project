var m = require("mithril");

var VideoURLInput = require("./components/VideoURLInput/VideoURLInput");

/*
    Site landing page with a textbox to recieive a video link and a "go" button
*/
var LandingPage = {

    view: () => {
        /* This vnode is just the background */
        return m("div", {class:"VideoURLWrapper"}, 
            /* Attatch the vnode for the text box and button */
            m(VideoURLInput)
        );
    }

};

module.exports = LandingPage;