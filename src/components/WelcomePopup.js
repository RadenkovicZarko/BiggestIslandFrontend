import React from 'react';
import './css/WelcomePopup.css';

function WelcomePopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to Island Adventure!</h2>
        <p>Embark on an epic journey to uncover the highest island peaks and explore the mysterious landscapes.</p>
        <ul>
            <li>Find the highest average height to progress through levels.</li>
            <li>Click on cells to discover island heights.</li>
            <li>Remember, each incorrect guess costs a life!</li>
        </ul>
        <button className="close-button" onClick={onClose}>Start Exploring</button>
      </div>
    </div>
  );
}

export default WelcomePopup;
