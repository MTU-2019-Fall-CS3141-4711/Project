var Firebase = require("firebase/app");
require("firebase/auth");

var Session = {
    Session: null,
    construct: () =>{
        Session.Session = Firebase.auth().currentUser;
    },

    isInitialized: () => {
        return (Firebase.auth().currentUser != null);
    },
    getUid: () => {
        return Session.Session.uid;
    },
    start: () => {
        return new Promise(function(resolve, reject){
            Firebase.auth().signInAnonymously()
            .then( (UserCredential) => {
                
                Session.Session = UserCredential.user;
                console.log(UserCredential.User);
                resolve();

            }).catch( (error) =>{
                
                reject(error);
            
            });
        });
    }

}

module.exports = Session;