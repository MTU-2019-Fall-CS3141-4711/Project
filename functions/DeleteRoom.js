var functions = require("firebase-functions");
var admin = require("firebase-admin");

/**
 * Everytime a user leaves the room, check if they are the last one
 * If they are, delete the room in both databases
 */
exports.onUserLeaveRoom = functions.database.ref("{room_id}/{user_id}").onDelete(
    async(snapshot, context) => {
        // Check if there are any entires in the user list
        let hasUsers = await snapshot.hasChildren();

        // If there are not any users, delete the room in both databases
        if(!hasUsers){
            /**
             *   Delete the userlist in the Realtime Database
             */
            await admin.database().ref(context.params.room_id).remove();

            /**
             *  Delete the room in Firestore 
             */
            let roomRef = admin.firestore().collection("room").doc(context.params.room_id);
            
            // Delete all the users (there shouldn't be any, but we're doing it anyway)
            await roomRef.collection("users").get()
                .then( (snapshot) => {
                    snapshot.forEach( (docRef) => {
                        docRef.delete();
                    })
                }).catch( (err) => console.log(err));

            // Delete all the queued videos
            await roomRef.collection("queue").get()
                .then( (snapshot) => {
                    snapshot.forEach( (docRef) => {
                        docRef.delete();
                    })
                }).catch( (err) => console.log(err));

            // Delete the room itself
            await roomRef.delete();
        }
    }
);