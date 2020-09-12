import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email , photoURL} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      return signInUser;
    })
    .catch(err => console.log(err))
    
  }

    //FB logging
export const handleFBLogIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        return user;

    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        
    });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return signOutUser;
    })
    .catch(err => console.log(err))
  }

// export const createUserWithEmailPassword = () => {
    
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.isSuccess = true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//     })
//     .catch(error => {
//       // Handle Errors here.
//       const newUserInfo = {...user}
//       newUserInfo.error = error.message;
//       newUserInfo.isSuccess = false;
//       setUser(newUserInfo);
//     });
// }

// export const logInUserWithEmailPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.isSuccess = true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);

//     })
//     .catch(error => {
//       const newUserInfo = {...user}
//       newUserInfo.error = error.message;
//       newUserInfo.isSuccess = false;
//       setUser(newUserInfo);
      
//     })
// }


// const updateUserName = name => {

//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name,
//     }).then(function() {
//       // Update successful.
//     }).catch(function(error) {
//       // An error happened.
//     });

//   }