var m = require("mithril");

var ChatMessage = {
    view: (vnode) => {
        if(vnode.attrs.style == "regular"){
            return m("div", {class:"chat_line"}, [
                m("b", vnode.attrs.user + ": "),
                m("span", vnode.attrs.message)
            ])
        }
        if(vnode.attrs.style == "informative"){
            return m("div", {class:"importantmessage"}, [
                //m("b", vnode.attrs.user + ": "),
                m("span", vnode.attrs.message)
            ])

        };
    }
}

module.exports = ChatMessage;