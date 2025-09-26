import React from 'react';
import Sidebar from './Sidebar';
import TicketTracker from './TicketTracker';
import './DisplayWindow.css'; // This imports the styles

function DisplayWindow() {
  return (
    <div className="display-window-container">
      <Sidebar />
      <TicketTracker />
    </div>
  );
}

export default DisplayWindow;