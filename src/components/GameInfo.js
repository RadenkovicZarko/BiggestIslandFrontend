import React from 'react';
import { FaHeart, FaStar, FaFlag, FaTrophy } from 'react-icons/fa';
import './css/GameInfo.css'

function GameInfo() {
  return (
    <div className="game-info">

<section className="lives-section">
        <h4><FaHeart /> Lives</h4>
        <div className="lives">
          <span className="heart" title="Remaining Lives">❤️</span>
          <span className="heart" title="Remaining Lives">❤️</span>
          <span className="heart" title="Remaining Lives">❤️</span>
        </div>
      </section>

      <section className="stats-section">
        <h4><FaFlag /> Game Stats</h4>
        <div className="stat-item">
          <FaStar className="icon" title="Current Level" />
          <p><strong>Level:</strong> 1</p>
        </div>
        <div className="stat-item">
          <FaStar className="icon" title="Current Score" />
          <p><strong>Accuracy:</strong> 0% </p>
        </div>
        <div className="stat-item">
          <FaTrophy className="icon" title="High Score" />
          <p><strong>Highest Level:</strong> 1</p>
        </div>
      </section>
    </div>
  );
}

export default GameInfo;
