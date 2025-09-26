import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './style.css'; 

const App = () => {
  
  const [isLogin, setIsLogin] = useState(true);

  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };


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