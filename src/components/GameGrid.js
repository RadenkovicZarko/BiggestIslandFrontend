import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/GameGrid.css';

function App() {
  const [matrix1, setMatrix1] = useState([]);
  const [matrix2, setMatrix2] = useState([]);
  const [maxValue, setMaxValue] = useState(1000);
  const [message, setMessage] = useState('');
  const [highlightedCells, setHighlightedCells] = useState(new Set());

  useEffect(() => {
    // Fetch matrices from backend API
    axios.get('http://localhost:8080/grid')
      .then((response) => {
        setMatrix1(response.data.matrix1); // Integer matrix
        setMatrix2(response.data.matrix2); // Double matrix
        setMaxValue(response.data.max); // Set max value for normalization
      })
      .catch((error) => console.error('Error fetching matrix data:', error));
  }, []);



  
  const getColorForValue = (value, rowIndex, colIndex) => {

    if (value === 0) return 'water-cell'; // Water (0)
  
    const normalizedValue = value / 1000;
  
    if (normalizedValue <= 0.1) {
      // Very bright green for values 1-100
      return `rgb(144, 238, 144)`;
    } else if (normalizedValue <= 0.3) {
      // Transition from bright green to darker green (101-300)
      const green = 238 - Math.floor((normalizedValue - 0.1) * 5 * 89); // Green from 238 to 150
      return `rgb(34, ${green}, 34)`;
    } else if (normalizedValue <= 0.5) {
      // Transition from dark green to bright yellow (301-500)
      const red = 255;
      const green = Math.floor(150 + (normalizedValue - 0.3) * 5 * 105); // Green from 150 to 255
      return `rgb(${red}, ${green}, 0)`;
    } else if (normalizedValue <= 0.7) {
      // Transition from bright yellow to yellow (501-700)
      const green = 255 - Math.floor((normalizedValue - 0.5) * 5 * 51); // Green from 255 to 204
      return `rgb(255, ${green}, 0)`;
    } else if (normalizedValue <= 0.8) {
      // Transition from yellow to bright brown (701-800)
      const red = 255 - Math.floor((normalizedValue - 0.7) * 10 * 105); // Red from 255 to 150
      const green = 204 - Math.floor((normalizedValue - 0.7) * 10 * 102); // Green from 204 to 102
      return `rgb(${red}, ${green}, 34)`;
    } else if (normalizedValue <= 0.9) {
      // Transition from bright brown to strong brown (801-900)
      const red = 150 - Math.floor((normalizedValue - 0.8) * 10 * 49); // Red from 150 to 101
      const green = 102 - Math.floor((normalizedValue - 0.8) * 10 * 53); // Green from 102 to 49
      return `rgb(${red}, ${green}, 34)`;
    } else {
      // Transition from strong brown to white (901-1000)
      const intensity = 255 - Math.floor((1 - normalizedValue) * 25); // Gradual transition to strong white
      return `rgb(${intensity}, ${intensity}, ${intensity})`;
    }
  };
  
  
  

  const handleClick = (rowIndex, colIndex) => {
    const valueInMatrix2 = matrix2[rowIndex][colIndex];
    if (valueInMatrix2 === maxValue) {
      setMessage(`The value at row ${rowIndex + 1}, column ${colIndex + 1} in Matrix 2 is equal to the max value.`);
      setHighlightedCells(new Set());
    } else {
      setMessage(`The value at row ${rowIndex + 1}, column ${colIndex + 1} in Matrix 2 is not equal to the max value.`);
      highlightIsland(rowIndex, colIndex);
    }
  };


  const highlightIsland = (startRow, startCol) => {
    const visited = new Set();
    const stack = [[startRow, startCol]];

    while (stack.length > 0) {
      const [row, col] = stack.pop();
      const key = `${row},${col}`;

      // Skip if already visited or out of bounds or the cell is 0 (water)
      if (visited.has(key) || row < 0 || col < 0 || row >= matrix1.length || col >= matrix1[0].length || matrix1[row][col] === 0) {
        continue;
      }

      visited.add(key);

      // Check adjacent cells (up, down, left, right)
      stack.push([row - 1, col]);
      stack.push([row + 1, col]);
      stack.push([row, col - 1]);
      stack.push([row, col + 1]);
    }
    
    setHighlightedCells((prevHighlightedCells) => new Set([...prevHighlightedCells, ...visited]));
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
                backgroundColor: getColorForValue(value, rowIndex, colIndex),
                position: 'relative', // Allow absolute positioning for overlay
              }}
              onClick={() => onClickHandler(rowIndex, colIndex)}
            >
              {/* Add overlay if the cell is part of the highlighted island */}
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
      <h1>Island Adventure</h1>
      {matrix1.length > 0 ? renderMatrix(matrix1, handleClick) : <p>Loading Matrix 1...</p>}
    </div>
  );
}

export default App;
