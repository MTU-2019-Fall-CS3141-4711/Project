let m = require("mithril");

let SearchButton = {
    view: () =>{
        return m("input[type=button]", {
            value:"Watch!",
            onclick: () => {
                console.log("go!");
                m.route.set("/a1b2c3d4e5");
            }
        });
    }
}

module.exports = SearchButton;