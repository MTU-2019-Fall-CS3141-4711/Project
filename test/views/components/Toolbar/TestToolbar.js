var mq = require("mithril-query");

var Toolbar = require("../../../../js/views/components/Toolbar/Toolbar");

describe("Toolbar", function(){
    var tbNode = null;
    before(function(){
        tbNode = mq(Toolbar);
    });

    it("should have icons in it", function(){
        tbNode.should.have.at.least(1, "i");
    });
});