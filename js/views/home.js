var m = require("mithril");

var Home = {

    view: () => {
        return m("h1", {style:"margin:auto;"}, "Hello World!");
    }

};

module.exports = Home;