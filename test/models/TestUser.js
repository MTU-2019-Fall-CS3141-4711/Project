var User = require("../../js/models/User");
var Assert = require('assert').strict;

describe("The User", function(){
    it("should be able to generate a random name", function(){
        Assert.doesNotReject(User.randomName());
    });
});