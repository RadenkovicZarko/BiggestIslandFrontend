import React, { useEffect, useState } from 'react';
import './App.css';
import GameInfo from './components/GameInfo';
import GameDescription from './components/GameDescription';
import GameGrid from './components/GameGrid'
import WelcomePopup from './components/WelcomePopup';
import GameOverPopup from './components/GameOverPopup';
import ErrorPopup from './components/ErrorPopup';
import SuccessPopup from './components/SuccessPopup';

function App() {

  const [showPopup, setShowPopup] = useState(true);

  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [accuracy, setAccuracy] = useState(0);
  const [highestLevel, setHighestLevel] = useState(1);
  const [misses, setMisses] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [restartKey, setRestartKey] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };


  const restartGame = () => {
    setLives(3);
    setLevel(1);
    setAccuracy(0);
    setMisses(0);
    setTotalAttempts(0);
    setRestartKey((prevKey) => prevKey + 1);
    setShowSuccessPopup(false); 
  };


  const handleGuess = (correct) => {
    setTotalAttempts(totalAttempts + 1);

    if (correct) {
      setLives(3);
      setRestartKey((prevKey) => prevKey + 1);
      setLevel((prevLevel) => prevLevel + 1);
      setHighestLevel((prevHighest) => Math.max(prevHighest, level + 1));
      setShowSuccessPopup(true); 
    } else {
      setMisses(misses + 1);
      if(lives > 1){
        setErrorMessage("Incorrect selection! Try again.")
        setShowErrorPopup(true); // Show error popup
      }
      setLives((prevLives) => prevLives - 1);
      
    }

    // Update accuracy
    const newAccuracy = ((totalAttempts - misses) / totalAttempts) * 100;
    setAccuracy(Math.round(newAccuracy));
  };

  useEffect(() => {
    if (lives <= 0) {
      setShowErrorPopup(false);
    }
  }, [lives]);

  return (
    <div className="game-container">
     
      {showPopup && <WelcomePopup onClose={closePopup} />} 
      {lives <= 0 && <GameOverPopup onRestart={restartGame} />}
      {showSuccessPopup && <SuccessPopup onClose={closeSuccessPopup} />}
      {(showErrorPopup && lives>0) && <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />}
      <GameInfo 
        lives={lives}
        level={level}
        accuracy={accuracy}
        highestLevel={highestLevel}
      />
      <GameGrid onGuess={handleGuess}  restartKey={restartKey}/>
      <GameDescription />
  </div>
  );
}

export default App;
