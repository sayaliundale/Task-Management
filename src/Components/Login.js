import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getApp } from 'firebase/app';
import '../Style/login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const auth = getAuth(getApp());

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (password.length < 6) {
        setError('Password should be at least 6 characters long.');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Redirect to dashboard upon successful login
      navigate('/dashboard1');
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error.message); // Display more specific error messages from Firebase
    }
  };


  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
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

          <button type="submit">Login</button>
          <p>
            <Link to="/forget-password">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
