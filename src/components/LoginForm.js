import React from 'react';
import './style.css';
const LoginForm = () => {
  const handleSubmit = (e) => {
    console.log("Login submitted!");
    
  };

  return (
    <div className="container">
      <form id="Login">
        <h2>Login</h2>

        <label htmlFor="username-login">User Name</label>
        <input 
          type="text" 
          id="username-login" 
          placeholder="Enter your name" 
          required 
        />
        {/* Removed <br> and <br><br> for better CSS control */}

        <label htmlFor="password-login">Password</label>
        <input 
          type="password" 
          id="password-login" 
          placeholder="Enter your password" 
          required 
        />

        {/* Changed type to "submit" and added onClick for form action */}
        <button type="button" id="submit" onClick={handleSubmit}>
          Submit
        </button>

        <p>
          Don't have an account? <a href="signUp.html">SignUp</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;