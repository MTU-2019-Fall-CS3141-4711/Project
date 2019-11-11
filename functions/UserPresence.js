// Runs in gCloud environment so requires are slightly different
var functions = require("firebase-functions");
var admin = require("firebase-admin");

exports.onUserPresenceChange = functions.database.ref("{room_id}/{uid}").onWrite(
    async(change, context) => {
        // If the value dne, then an onDisconnect() delete just occured and they should be
        // removed from the userlist
        let connect = await change.after.exists();
        if(!connect){
            // Return the promise so that Firebase doesn't terminate execution prematurly
            return admin.firestore().collection("room").doc(context.params.room_id)
                .collection("users").doc(context.params.uid)
                .delete();

        }
    }
);

