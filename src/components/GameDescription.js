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
          Your mission is to identify the island with the highest average height. Explore the grid to uncover islands, but remember, each move brings you closer to victory or costs you a life!
        </p>
      </section>

      <section>
        <h4><FaHeart /> Lives</h4>
        <p>
          You start with <strong>three lives</strong>. Each wrong guess will cost you one life, so choose carefully and aim for the highest average height island.
        </p>
      </section>

      <section>
        <h4><FaWater /> Strategy</h4>
        <p>
          Analyze the grid and pick islands based on their average height to maximize your score. Progress through challenging levels, and set a new high score by locating the highest average height islands.
        </p>
      </section>

      <footer>
        <p>Good luck, brave explorer! Embark on this adventure and find the highest average height island!</p>
      </footer>
    </div>
  );
}

export default GameDescription;
