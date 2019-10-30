var mq = require("mithril-query");

var ChatBox = require("../../../../js/views/components/ChatBox/ChatBox");

describe("The chat box", function(){
    
    var chNode = mq(ChatBox);

    it("should exist and get more tests later", function(){
        chNode.should.have([".chatbox"]);
    });
});