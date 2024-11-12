import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import GameInfo from './components/GameInfo';
import GameDescription from './components/GameDescription';
import GameGrid from './components/GameGrid'
import WelcomePopup from './components/WelcomePopup';

function App() {

  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="game-container">
      {showPopup && <WelcomePopup onClose={closePopup} />} 
      <GameInfo />
      {/* <h1>Island Adventure</h1>
      {matrix1.length > 0 ? renderMatrix(matrix1, handleClick) : <p>Loading Matrix 1...</p>} */}
      <GameGrid />
      <GameDescription />
  </div>

    // <div className="App">
   
    // </div>
  );
}

export default App;
