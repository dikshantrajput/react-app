import React, {useState, useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFBLogIn, createUserWithEmailPassword, logInUserWithEmailPassword } from './LoginManager';


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

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    });
  }

  const fBLogIn = () => {
    handleFBLogIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
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
      createUserWithEmailPassword(user.name, user.email, user.password)
      .then((res) =>{
        handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password) {
      logInUserWithEmailPassword(user.email, user.password)
      .then((res) => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fBLogIn}>Sign In With Facebook</button>
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
