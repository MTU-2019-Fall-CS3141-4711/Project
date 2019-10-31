var RoomState = require("../../js/models/RoomState");
var Firebase = require("@firebase/testing");
var Assert = require('assert').strict
describe("Room state should be able to create a new room", function(){
    it(".", function(){
        Firebase.assertSucceeds(RoomState.createNew());
    });

    it("and retreive the room id", function(){
        RoomState.createNew().then( () => {
            Assert.strictEqual( (typeof RoomState.Room_ID == "object"), true);
            Assert.strictEqual( (RoomState.Room_ID.length > 0), true );
        }).catch(function() {
            //Init didn't work
            Assert.strictEqual(false, true);
        });
    });

});

describe("Room state should be able to resume an existing room", function(){
    it("should work.", async function(){
        RoomState.createNew().then( () => {
            RoomState.constructExisting(RoomState.Room_ID).then(function(){
                Assert.strictEqual( (typeof RoomState.Room_ID == "object"), true);
                Assert.strictEqual( (RoomState.Room_ID.length > 0), true );
            }).catch( function() {
                //Init didn't work
                Assert.strictEqual(false, true);
            });
        }).catch(function() {
            //Init didn't work
            Assert.strictEqual(false, true);
        });
    });
});