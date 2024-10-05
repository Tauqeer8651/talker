import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './login.css';
import './firebase'


import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // ...rest of the code

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        console.log('Logged in:', userCredential.user);
        navigate('/chat'); // Redirect to the chat page
      })
 
      .catch((error) => {
        setError(error.message);
      });
    }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful login
        console.log('Logged in:', userCredential.user);
        // Redirect to chat page or update state
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login to Chat App</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};
};
  

export default Login;
