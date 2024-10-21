import React, { useState } from 'react';
import './App.css';

const MAX_PATH_LENGTH = 70;
const MIN_PATH_LENGTH = 10;
const MULTIPLE_OF = 5;
const MAX_LIVES = 10;

const App = () => {
  const [player, setPlayer] = useState({
    symbol: 'P',
    lives: 3,
    treasuresFound: 0,
    history: []
  });

  const [game, setGame] = useState({
    maxMoves: 20,
    pathLength: 20,
    bombs: Array(20).fill(0),
    treasures: Array(20).fill(0)
  });

  const resetHistory = (history, length) => {
    for (let i = 0; i < length; i++) {
      history[i] = -1;
    }
  };

  const startGame = () => {
    const playerSymbol = document.getElementById('player-symbol').value;
    const playerLives = parseInt(document.getElementById('player-lives').value);
    const pathLength = parseInt(document.getElementById('path-length').value);
    const maxMoves = Math.floor(pathLength * 0.75);

    setPlayer({
      ...player,
      symbol: playerSymbol,
      lives: playerLives,
      treasuresFound: 0,
      history: Array(pathLength).fill(-1)
    });

    setGame({
      maxMoves: maxMoves,
      pathLength: pathLength,
      bombs: Array(pathLength).fill().map(() => Math.random() < 0.2 ? 1 : 0),
      treasures: Array(pathLength).fill().map(() => Math.random() < 0.2 ? 1 : 0)
    });

    createGameBoard();
  };

  const createGameBoard = () => {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for (let i = 0; i < game.pathLength; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.onclick = () => handleCellClick(i);
      gameBoard.appendChild(cell);
    }
  };

  const handleCellClick = (index) => {
    if (player.history.includes(index)) return;

    const newHistory = [...player.history, index];
    setPlayer({ ...player, history: newHistory });

    const cell = document.querySelectorAll('.cell')[index];
    cell.classList.add('clicked');

    let message = '';

    if (game.bombs[index] === 1) {
      message = 'Boom! You hit a bomb!';
      player.lives--;
    } else if (game.treasures[index] === 1) {
      message = 'Yay! You found a treasure!';
      player.treasuresFound++;
    } else {
      message = 'Nothing here. Keep moving!';
    }

    if (player.lives <= 0) {
      message = 'Game Over! You ran out of lives.';
      disableGameBoard();
    }

    document.getElementById('status').textContent = message;
  };

  const disableGameBoard = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.onclick = null);
  };

  return (
    <div className="app">
      <h1>Reveal the Path Game</h1>
      <div id="settings">
        <label htmlFor="player-symbol">Player Symbol:</label>
        <input type="text" id="player-symbol" maxLength="1" defaultValue="P" /><br />
        <label htmlFor="player-lives">Player Lives (1-10):</label>
        <input type="number" id="player-lives" min="1" max="10" defaultValue="3" /><br />
        <label htmlFor="path-length">Path Length (10-70, multiple of 5):</label>
        <input type="number" id="path-length" min="10" max="70" step="5" defaultValue="20" /><br />
        <button onClick={startGame}>Start Game</button>
      </div>
      <div id="game-board" className="maze"></div>
      <div id="status"></div>
    </div>
  );
};

export default App;
