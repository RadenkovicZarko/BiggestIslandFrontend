import React from 'react';
import './css/SuccessPopup.css';

function SuccessPopup({ onClose }) {
  return (
    <div className="success-overlay">
      <div className="success-content">
        <h2>Good Job!</h2>
        <p>You found the highest average height island!</p>
        <button className="close-button" onClick={onClose}>Awesome!</button>
      </div>
    </div>
  );
}

export default SuccessPopup;
