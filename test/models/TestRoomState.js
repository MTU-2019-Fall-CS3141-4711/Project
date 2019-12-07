var RoomState = require("../../js/models/RoomState");
var Firebase = require("@firebase/testing");
var Assert = require('assert').strict;

describe("Room state should be able to resume an existing room", function(){
    it("should work.", function(){
        RoomState.constructExisting(RoomState.Room_ID);
        Assert( RoomState.Room_ID.length > 0 );
    });
});