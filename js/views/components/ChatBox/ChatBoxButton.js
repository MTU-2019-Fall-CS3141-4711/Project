var m = require("mithril");

var ChatBox = require("./ChatBox");

var ChatBoxButton = {
    view: (vnode) => {
        return m("input[type=button]", {class:"chatboxbutton", value: "Enter",
            onclick: () => {
                console.log("Enter was clicked");
            }
        }
    );

}
}

module.exports = ChatBoxButton;
