import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/GameGrid.css';
import Popup from './Popup';

function GameGrid({ onGuess, restartKey }) {
  const [matrix1, setMatrix1] = useState([]);
  const [matrix2, setMatrix2] = useState([]);
  const [maxValue, setMaxValue] = useState(1000);
  const [highlightedCells, setHighlightedCells] = useState(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/grid`)
      .then((response) => {
        setMatrix1(response.data.matrix1);
        setMatrix2(response.data.matrix2);
        setMaxValue(response.data.max);
      })
      .catch((error) => console.error('Error fetching matrix data:', error));

    setHighlightedCells(new Set());
  }, [restartKey]);

  const getColorForValue = (value) => {
    if (value === 0) return 'water-cell';
  
    const normalizedValue = value / 1000;
  
    if (normalizedValue <= 0.1) {
      return `rgb(144, 238, 144)`;
    } else if (normalizedValue <= 0.3) {
      const green = 238 - Math.floor((normalizedValue - 0.1) * 5 * 89);
      return `rgb(34, ${green}, 34)`;
    } else if (normalizedValue <= 0.5) {
      const green = Math.floor(150 + (normalizedValue - 0.3) * 5 * 105);
      return `rgb(255, ${green}, 0)`;
    } else if (normalizedValue <= 0.7) {
      const green = 255 - Math.floor((normalizedValue - 0.5) * 5 * 51);
      return `rgb(255, ${green}, 0)`;
    } else if (normalizedValue <= 0.8) {
      const red = 255 - Math.floor((normalizedValue - 0.7) * 10 * 105);
      const green = 204 - Math.floor((normalizedValue - 0.7) * 10 * 102);
      return `rgb(${red}, ${green}, 34)`;
    } else if (normalizedValue <= 0.9) {
      const red = 150 - Math.floor((normalizedValue - 0.8) * 10 * 49);
      const green = 102 - Math.floor((normalizedValue - 0.8) * 10 * 53);
      return `rgb(${red}, ${green}, 34)`;
    } else {
      const intensity = 255 - Math.floor((1 - normalizedValue) * 25);
      return `rgb(${intensity}, ${intensity}, ${intensity})`;
    }
  };

  const handleClick = (rowIndex, colIndex) => {
    const valueInMatrix2 = matrix2[rowIndex][colIndex];

    if (valueInMatrix2 === maxValue) {
      setHighlightedCells(new Set());
      onGuess(true);
    } 
    else if(valueInMatrix2===-1)
    {
      setPopupMessage('You already selected that island, and it does not have the highest average height among all islands.');
      setShowPopup(true);
    }else {
      highlightIsland(rowIndex, colIndex);
      onGuess(false);
    }
  };

  const highlightIsland = (startRow, startCol) => {
    const visited = new Set();
    const stack = [[startRow, startCol]];
   
    while (stack.length > 0) {
      const [row, col] = stack.pop();
      const key = `${row},${col}`;

      if (visited.has(key) || row < 0 || col < 0 || row >= matrix1.length || col >= matrix1[0].length || matrix1[row][col] === 0) {
        continue;
      }

      visited.add(key);
      matrix2[row][col] = -1;
      stack.push([row - 1, col]);
      stack.push([row + 1, col]);
      stack.push([row, col - 1]);
      stack.push([row, col + 1]);
      stack.push([row + 1, col + 1]);
      stack.push([row + 1, col - 1]);
      stack.push([row - 1, col - 1]);
      stack.push([row - 1, col + 1]);
    }
    
    setHighlightedCells((prev) => new Set([...prev, ...visited]));
  };

  const renderMatrix = (matrix, onClickHandler) => (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((value, colIndex) => (
            <div
              key={colIndex}
              className={`matrix-cell ${value === 0 ? 'water-cell' : ''}`}
              style={{
                backgroundColor: getColorForValue(value),
                position: 'relative',
              }}
              onClick={() => onClickHandler(rowIndex, colIndex)}
            >
              {highlightedCells.has(`${rowIndex},${colIndex}`) && (
                <div className="red-overlay" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="game-grid">
      {showPopup && (<Popup message={popupMessage} onClose={() => setShowPopup(false)} />)}
      <h1>Island Adventure</h1>
      {matrix1.length > 0 ? renderMatrix(matrix1, handleClick) : <p>Loading Matrix 1...</p>}
    </div>
  );
}

export default GameGrid;
