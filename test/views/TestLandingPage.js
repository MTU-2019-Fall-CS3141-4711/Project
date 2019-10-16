var mq = require("mithril-query");

var LandingPage = require("../../js/views/LandingPage");

describe("The landing page", function(){
    var lpNode = mq(LandingPage);

    it("should have a wrapper div for positioning", function(){
        lpNode.should.have([".VideoURLWrapper"]);
    });

    it("should have an input field for the url", function(){
        lpNode.should.have("input[type=text]");
    });

    it("should have a button to create a room", function(){
        lpNode.should.have("input[type=button]");
    });
});