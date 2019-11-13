var RoomState = require("../../js/models/RoomState");
var Firebase = require("@firebase/testing");
var Assert = require('assert').strict;

describe("Room state should be able to resume an existing room", function(){
    it("should work.", async function(){
        await RoomState.constructExisting(RoomState.Room_ID).then(function(){
            Assert( RoomState.Room_ID.length > 0 );
        }).catch( function(err) {            
            Assert.ifError(err);
        });
    });
});