var m = require("mithril");

var LoadingPage = {
    view: (vnode) => {
        return m("img", {src:"./loading.gif", style:"width: 125px; height: 125px; margin: 30vh 46vw;"});  
    }
}

module.exports = LoadingPage;