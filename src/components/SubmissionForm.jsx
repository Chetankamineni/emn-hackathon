import React from 'react';
import { useNavigate } from 'react-router-dom';

function SubmissionForm() {
  // Get the navigate function from the router
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // Prevent the default form submission which reloads the page
    event.preventDefault();
    
    // Programmatically navigate to the '/dashboard' route
    console.log('Navigating to dashboard...');
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Submission Page</h1>
      <p>Click the button to go to the ticket tracker dashboard.</p>
      <form onSubmit={handleSubmit}>
        {/* You can add form inputs here if needed */}
        <button type="submit">
          Go to Ticket Tracker
        </button>
      </form>
    </div>
  );
}

export default SubmissionForm;