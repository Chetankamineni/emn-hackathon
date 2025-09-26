import React from 'react';
import './style.css'; // Import the CSS file

const LoginForm = () => {
  const handleSubmit = (e) => {
    // Prevent default form submission if you plan to use an actual submit type
    // In your original code, the button was type="button", but a form often needs submission logic.
    // e.preventDefault(); 
    console.log("Login submitted!");
    // Add actual login logic here
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