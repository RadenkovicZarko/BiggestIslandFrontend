import React from 'react';
import { FaHeart, FaStar, FaFlag, FaTrophy } from 'react-icons/fa';
import './css/GameInfo.css';

function GameInfo({ lives, level, accuracy, highestLevel }) {
  return (
    <div className="game-info">
      <section className="lives-section">
        <h4><FaHeart /> Lives</h4>
        <div className="lives">
          {Array.from({ length: lives }).map((_, index) => (
            <span key={index} className="heart" title="Remaining Life">❤️</span>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h4><FaFlag /> Game Stats</h4>
        <div className="stat-item">
          <FaStar className="icon" title="Current Level" />
          <p><strong>Level:</strong> {level}</p>
        </div>
        <div className="stat-item">
          <FaStar className="icon" title="Current Accuracy" />
          <p><strong>Accuracy:</strong> {accuracy}%</p>
        </div>
        <div className="stat-item">
          <FaTrophy className="icon" title="Highest Level" />
          <p><strong>Highest Level:</strong> {highestLevel}</p>
        </div>
      </section>
    </div>
  );
}

export default GameInfo;
