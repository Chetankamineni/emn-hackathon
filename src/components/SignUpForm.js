import React from 'react';
import './style.css'; // Import the CSS file

const SignUpForm = () => {
  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("Sign-Up submitted!");
    // Add actual sign-up logic here
  };

  return (
    <div className="container">
      <form id="SignUp">
        <h2>Sign Up</h2>

        <label htmlFor="username-signup">Enter Username</label>
        <input 
          type="text" 
          id="username-signup" 
          placeholder="Enter your name" 
          required 
        />
        
        <label htmlFor="password-signup">Password</label>
        <input 
          type="password" 
          id="password-signup" 
          placeholder="Enter your password" 
          required 
        />

        <button type="button" id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;