var Room = require("./../../js/views/Room");
var mq = require("mithril-query");

describe("Room should", function(){
    rNode = mq(Room);
    it("load", function(){
        rNode.should.have("section");
    });
});