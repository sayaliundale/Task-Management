import React, { useState } from 'react';
import {Link } from "react-router-dom";
import '../Style/Sigin.css'; 
import {createUserWithEmailAndPassword}from 'firebase/auth';
import { auth } from '../firebase';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
    } else {
      setError('');
      console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
    }
    
  };

  const register = async() =>{
    try{
      if(password.length < 6){
          setError("Password should be atleast 6 charcter long");
      }
      setError('');
      const user =await  createUserWithEmailAndPassword(auth,email, password);
      console.log(user);
    } catch(error){
        console.log(error.message);
    }
}
  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         {error && <p className="error">{error}</p>}
        <button type="submit" onClick={register}>Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
