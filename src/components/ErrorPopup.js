import React, { useEffect } from 'react';
import './css/ErrorPopup.css';

function ErrorPopup({ message, onClose }) {
  // Automatically close the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close after 3 seconds
    return () => clearTimeout(timer); // Clear timer if the component unmounts
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
