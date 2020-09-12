import React, {useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import Header from '../Header/Header';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

function LogIn() {

  const [newUser, setNewUser] = useState(false)

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    isSuccess: false,
    error: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email , photoURL} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser)
    })
    .catch(err => console.log(err))
    
  }


  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signOutUser)
    })
    .catch(err => console.log(err))
  }

  //FB logging
  const handleFBLogIn = () => {
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

    //get input from
    const handleChange = (event) => {
      let isFieldValid = true;
      if(event.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); 
      }
      if(event.target.name === 'password'){
        const isValidPassword = event.target.value.length > 6;
        const isNumber = /\d{1}/.test(event.target.value);
        isFieldValid = isValidPassword && isNumber;  
      }
      if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);
      }
      
    }
  //onSubmit
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.isSuccess = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.isSuccess = false;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.isSuccess = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);

      })
      .catch(error => {
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.isSuccess = false;
        setUser(newUserInfo);
        
      })
    }
    e.preventDefault();
  }

  const updateUserName = name => {

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });

  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={handleFBLogIn}>Sign In With Facebook</button>
      {
        user.isSignIn && <div>
          <h3>Welcome, {user.name}</h3>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="user"/>
        </div>
      }
      <br/><br/>
      <input onChange={() => {setNewUser(!newUser)}} type="checkbox" name="newUser"/>
      <label htmlFor="newUser">New User Register</label>
      <br/>
      <form onSubmit={handleSubmit}>
        {
          newUser &&         <input onBlur={handleChange} name="name" placeholder="Enter your Name" type="text" required />
        }
        <br/>
        <input onBlur={handleChange} name="email" placeholder="Enter your email" type="text" required />
        <br/>
        <br/>
        <input onBlur={handleChange} name="password" placeholder="Enter your password" type="password" required/>
        <br/>
        <br/>
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
      </form>
      {
        user.isSuccess &&  <p style={{color: "green"}}>User {newUser ? "created" : "Logged in"} successfully</p>
      }
      <p style={{color: "red"}}>{user.error}</p>
    </div>
  );
}

export default LogIn;
