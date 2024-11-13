import React from 'react';
import { FaHeart, FaMountain, FaWater } from 'react-icons/fa';
import './css/GameDescription.css'

function GameDescription() {
  return (
    <div className="game-description">
      <h2>How to Play</h2>

<section>
  <h4><FaMountain /> Objective</h4>
  <p>
    Find the island with the highest average height! Each choice brings you closer to victory, but a wrong guess costs a life. Choose wisely!
  </p>
</section>

<section>
  <h4><FaHeart /> Lives</h4>
  <p>
    You have <strong>three lives</strong>. Each incorrect guess will cost one, so pick your islands carefully to reach the peak!
  </p>
</section>

<section>
  <h4><FaWater /> Strategy</h4>
  <p>
    Green areas are lower, and heights increase through yellow, brown, and icy white peaks. Track the terrain and aim high!
  </p>
</section>

<footer>
  <p>Good luck, explorer! Begin your journey and uncover the island with the highest average height!</p>
</footer>

    </div>
  );
}

export default GameDescription;
