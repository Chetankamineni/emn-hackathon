import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import './style.css'; // Important to include the CSS here or in index.js

const App = () => {
  // Use state to toggle between Login and Sign-Up for a single-page feel
  const [isLogin, setIsLogin] = useState(true);

  // In a real application, you'd use a router (like React Router)
  // but for this example, we use conditional rendering.
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Note: The 'a' tag in the LoginForm still links to 'signUp.html'.
  // In a React app, you'd update it to use a router link or the toggleForm function.
  // We'll update the Login form's link to use the toggle function:
  /*
    <p>
      Don't have account? 
      <a href="#" onClick={(e) => {e.preventDefault(); toggleForm();}}>
        SignUp
      </a>
    </p>
  */

  return (
    <div className="App">
      {/* The body styling (display: flex, height: 100vh) in style.css centers this content */}
      {isLogin ? (
        <LoginForm />
      ) : (
        <SignUpForm />
      )}
      
      {/* Simple toggle for demonstration */}
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <button 
          onClick={toggleForm} 
          style={{ width: 'auto', padding: '5px 15px', backgroundColor: '#333' }}
        >
          {isLogin ? 'Go to Sign Up' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
};

export default App;