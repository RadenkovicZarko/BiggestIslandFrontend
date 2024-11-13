import React, { useEffect } from 'react';
import './css/Popup.css';

function Popup({ message, onClose }) {
  
  useEffect(() => {
    const timer = setTimeout(onClose, 10000); // Close after 3 seconds
    return () => clearTimeout(timer); // Clear timer if the component unmounts
  }, [onClose]);

  return (
    <div className="error-popup-overlay">
      <div className="error-popup-content">
        <h3>It's red...</h3>
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;



  