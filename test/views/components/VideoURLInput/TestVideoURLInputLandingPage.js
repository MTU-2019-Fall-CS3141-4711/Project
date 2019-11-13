var mq = require("mithril-query");

var VideoURLInput= require("../../../../js/views/components/VideoURLInput/VideoURLInput");
var QueueButton = require("../../../../js/views/components/VideoURLInput/QueueButton");
var SearchButton = require("../../../../js/views/components/VideoURLInput/SearchButton");

describe("VideoURLInput", function(){
    describe("The Search Button", function(){
        var vuiSearchButton = null;

        before(function(){
            vuiSearchButton = mq(SearchButton);
        });

        it("should say 'search'",function(){
            vuiSearchButton.should.have("input[type=button]");
        });
    });

    describe("The Queue Button", function(){
        
        var vuiQueueButton = null;
        
        before(function(){
            vuiQueueButton = mq(QueueButton);
        });

        it("should say 'queue'",function(){
            vuiQueueButton.should.have("input[type=button]");
        });
    });

    describe("Standalone", function(){
        var vuiNode = null;
        before(function () {
            vuiNode = mq(VideoURLInput);
        });

        it("should have a textbox", function(){
            vuiNode.should.have(1, "input[type=text]");
        });

        it("should have a button", function(){
            vuiNode.should.have(1, "input[type=button]");
        });
    });
});