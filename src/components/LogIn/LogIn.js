import React, {useState, useContext } from 'react';
import Header from '../Header/Header';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework } from './LoginManager';


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

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


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
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleGoogleSignIn}>Sign In</button>
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
