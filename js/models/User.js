var Firebase = require("firebase/app");
require("firebase/auth");

var User = {
    User: null,
    construct: () =>{
        User.User = Firebase.auth().currentUser;
    },
    isUserSignedIn: () => {
        return (Firebase.auth().currentUser != null);
    },
    signIn: () => {
        return new Promise(function(resolve, reject){
            Firebase.auth().signInAnonymously()
            .then( (UserCredential) => {
                
                User.User = UserCredential.User;
                resolve();

            }).catch( (error) =>{
                
                reject(error);
            
            });
        });
    }

}

module.exports = User;