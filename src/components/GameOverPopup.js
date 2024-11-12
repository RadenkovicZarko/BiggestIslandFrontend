import React from 'react';
import './css/GameOverPopup.css';

function GameOverPopup({ onRestart }) {
  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>Game Over</h2>
        <p>You've run out of lives. Better luck next time!</p>
        <button className="restart-button" onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default GameOverPopup;
