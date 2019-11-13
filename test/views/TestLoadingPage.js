var mq = require("mithril-query");
var LoadingPage = require("../../js/views/LoadingPage");
var Assert = require('assert').strict;

describe("The loading page", function(){
    var lpNode = null;
    before(function(){
        lpNode = mq(LoadingPage);
    });

    it("should have the loading gif", function(){
        lpNode.should.have(1, "img");
    });
});