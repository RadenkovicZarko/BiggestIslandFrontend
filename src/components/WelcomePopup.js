import React from 'react';
import './css/WelcomePopup.css';

function WelcomePopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <h2>Welcome to Island Adventure!</h2>
        <p>Embark on an epic journey across vibrant landscapes to uncover the island's highest peaks.</p>
        <ul>
          <li><strong>Terrain Guide:</strong> Green fields represent grassy areas at lower altitudes, while higher elevations are marked by yellow and brown shades, leading up to icy peaks in white.</li>
          <li><strong>Your Goal:</strong> Explore and identify the island with the highest average height to progress through levels.</li>
          <li><strong>How to Play:</strong> Click on cells to reveal heights. Each incorrect guess costs a life, so choose wisely!</li>
        </ul>
        <button className="close-button" onClick={onClose}>Start Exploring</button>
      </div>
    </div>
  );
}

export default WelcomePopup;
