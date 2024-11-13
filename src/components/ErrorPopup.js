import React, { useEffect } from 'react';
import './css/ErrorPopup.css';

function ErrorPopup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div className="error-popup-overlay">
      <div className="error-popup-content">
        <h3>Oops!</h3>
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ErrorPopup;
