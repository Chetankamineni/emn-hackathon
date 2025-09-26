import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmissionForm from './SubmissionForm';
import DisplayWindow from './DisplayWindow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the initial page with the submit button */}
        <Route path="/" element={<SubmissionForm />} />
        
        {/* Route for the destination page with the sidebar and ticket tracker */}
        <Route path="/dashboard" element={<DisplayWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;