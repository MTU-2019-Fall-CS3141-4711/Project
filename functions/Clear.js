var functions = require("firebase-functions");
var admin = require("firebase-admin");

/**
 * Checks if room is clear of users and deletes if so when called
 */
exports.clear = functions.https.onRequest(
    async(req, res) => {
        await admin.firestore().collection("room").get().then( async(snapshot) => {
        snapshot.forEach(async(roomy) => {
        // Check if there are any entires in the user list
        let hasUsers = true;
        let room_id = roomy.id;
        await admin.database().ref(room_id).once("value")
            .then( (snapshot) => {
                hasUsers = snapshot.hasChildren();
            });

        // If there are not any users, delete the room in both databases
        if(!hasUsers){
            /**
             *   Delete the userlist in the Realtime Database
             */
            await admin.database().ref(room_id).remove();

            /**
             *  Delete the room in Firestore 
             */
            let roomRef = admin.firestore().collection("room").doc(room_id);
            
            
            // Delete all the users (there shouldn't be any, but we're doing it anyway)
            await roomRef.collection("users").get()
                .then( (snapshot) => {
                    snapshot.forEach( (queryRef) => {
                        queryRef.ref.delete();
                    })
                }).catch( (err) => console.log(err));


            // Delete all the chat messages
            await roomRef.collection("chats").get()
            .then( (snapshot) => {
                snapshot.forEach( (queryRef) => {
                    queryRef.ref.delete();
                })
            }).catch( (err) => console.log(err));


            // Delete all the moderator roles
            await roomRef.collection("moded_users").get()
            .then( (snapshot) => {
                snapshot.forEach( (queryRef) => {
                    queryRef.ref.delete();
                })
            }).catch( (err) => console.log(err));


            // Delete all the banned users
            await roomRef.collection("banned_users").get()
            .then( (snapshot) => {
                snapshot.forEach( (queryRef) => {
                    queryRef.ref.delete();
                })
            }).catch( (err) => console.log(err));


            // Delete all the queued videos
            await roomRef.collection("queue").get()
                .then( (snapshot) => {
                    snapshot.forEach( (queryRef) => {
                        queryRef.ref.delete();
                    })
                }).catch( (err) => console.log(err));

            // Delete the room itself
            await roomRef.delete();
            
            //these console.logs probably aren't actually visible anywhere
            console.log("Cleared "+room_id);
        }else{console.log(room_id + "survived clear")}
        
    });
    
});
    //send http response to prevent timeout
    res.status(200).send('Cleared');
    return;
    }
);
