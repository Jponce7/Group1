import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileGameProgress } from '../store/profilesSlice'; // Assuming you have this
import { db } from '../firebase/config'; // Assuming you’re using Firestore
import './MissingLettersGame.css'; // Create a CSS file for styling

const MissingLettersGame = () => {
  const dispatch = useDispatch();

  // Get the active profile from Redux store
  const activeProfile = useSelector((state) => state.profiles.activeProfile);

  // Game states
  const [word, setWord] = useState('HELLO'); // Default word for demo purposes
  const [missingIndices, setMissingIndices] = useState([1, 3]); // Indices where letters are missing
  const [userInput, setUserInput] = useState(Array(word.length).fill(''));
  const [gameState, setGameState] = useState('start');
  const [lives, setLives] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(60); // Optional timer

  // Handle input change
  const handleChange = (value, index) => {
    const updatedInput = [...userInput];
    updatedInput[index] = value.toUpperCase();
    setUserInput(updatedInput);
  };

  // Check if the user's input is correct
  const checkAnswer = () => {
    let isCorrect = true;
    missingIndices.forEach((index) => {
      if (userInput[index] !== word[index]) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      setGameState('won');
      dispatch(
        updateProfileGameProgress({
          profileId: activeProfile.id,
          game: 'MissingLetters',
          score: (activeProfile.games.MissingLetters?.score || 0) + 100,
        })
      );
    } else {
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 === 0) {
        setGameState('gameOver');
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && gameState === 'playing') {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setGameState('gameOver');
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, gameState]);

  const renderGame = () => (
    <div className="game-missingletters">
      <h2>Guess the Missing Letters</h2>
      <div className="word">
        {word.split('').map((letter, index) => (
          <span key={index}>
            {missingIndices.includes(index) ? (
              <input
                type="text"
                maxLength="1"
                value={userInput[index]}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ) : (
              letter
            )}
          </span>
        ))}
      </div>
      <div className="controls">
        <button onClick={checkAnswer}>Check Answer</button>
        <p>Lives: {lives}</p>
        <p>Time Remaining: {timeRemaining}</p>
      </div>
    </div>
  );

  const renderStartScreen = () => (
    <div className="start-screen">
      <h2>Welcome to the Missing Letters Game</h2>
      <button
        onClick={() => {
          setGameState('playing');
        }}
      >
        Start Game
      </button>
    </div>
  );

  const renderGameOver = () => (
    <div className="game-over">
      <h2>Game Over</h2>
      <button onClick={() => setGameState('start')}>Back to Menu</button>
    </div>
  );

  const renderWonScreen = () => (
    <div className="won-screen">
      <h2>Congratulations! You won!</h2>
      <button onClick={() => setGameState('start')}>Back to Menu</button>
    </div>
  );

  return (
    <div className="game-container">
      {gameState === 'start' && renderStartScreen()}
      {gameState === 'playing' && renderGame()}
      {gameState === 'gameOver' && renderGameOver()}
      {gameState === 'won' && renderWonScreen()}
    </div>
  );
};

export default MissingLettersGame;
