var mq = require("mithril-query");

var BanButton = require("../../../../js/views/components/ChatBox/BanButton");
var PardonButton = require("../../../../js/views/components/ChatBox/PardonButton");
var PromoteButton = require("../../../../js/views/components/ChatBox/PromoteButton");
var DemoteButton = require("../../../../js/views/components/ChatBox/DemoteButton");

describe("The ban button", function(){
    var btnNode = null;
    before(function(){
        btnNode = mq(BanButton);
    });

    it("should ban someone when clicked", function(){
        btnNode.click(".banbutton");
        //TODO: Check that this works server side
    });
});

describe("The pardon button", function(){
    var btnNode = null;
    before(function(){
        btnNode = mq(PardonButton);
    });

    it("should pardon someone when clicked", function(){
        btnNode.click(".promotebutton");
        //TODO: Check that this works server side
    });
});

describe("The promote button", function(){
    var btnNode = null;
    before(function(){
        btnNode = mq(PromoteButton);
    });

    it("should promote someone when clicked", function(){
        btnNode.click(".promotebutton");
        //TODO: Check that this works server side
    });
});

describe("The demote button", function(){
    var btnNode = null;
    before(function(){
        btnNode = mq(DemoteButton);
    });

    it("should demote someone when clicked", function(){
        btnNode.click(".demotebutton");
        //TODO: Check that this works server side
    });
});