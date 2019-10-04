var m = require("mithril");

var VideoURLInput = require("./components/VideoURLInput/VideoURLInput");

var LandingPage = {

    view: () => {
        return m("div", {class:"VideoURLWrapper"}, 
            m(VideoURLInput)
        );
    }

};

module.exports = LandingPage;