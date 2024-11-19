import React, { useState, useEffect } from 'react';
import ExitButton from '../components/ExitButton';
import './GameSimonSays.css';

function GameSimonSays() {
 
  const [prompt, setPrompt] = useState('');
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctInfo, setCorrectInfo] = useState({
    name: 'John Doe',
    address: '123 Main St',
    phone: '123-456-7890',
    school: 'ABC High School',
    parentsName: 'Jane and John Doe',
  });


  const prompts = [
    'What is your name?',
    'What is your home address?',
    'What is your phone number?',
    'What is your school name?',
    'What is your parents\' name?',
  ];


  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  };

 
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  
  const checkAnswer = () => {
    let correctAnswer = '';

    switch (prompt) {
      case 'What is your name?':
        correctAnswer = correctInfo.name;
        break;
      case 'What is your home address?':
        correctAnswer = correctInfo.address;
        break;
      case 'What is your phone number?':
        correctAnswer = correctInfo.phone;
        break;
      case 'What is your school name?':
        correctAnswer = correctInfo.school;
        break;
      case 'What is your parents\' name?':
        correctAnswer = correctInfo.parentsName;
        break;
      default:
        break;
    }


    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct answer is: ${correctAnswer}`);
    }
  };

  useEffect(() => {
    generatePrompt();  
  }, []);

  return (
    <div className="game-container">
      <ExitButton />
      <h1>Simon Says</h1>
      <p className="instructions">{prompt}</p>
      <input
        type="text"
        className="input-field"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter your answer here"
      />
      <button className="submit-button" onClick={checkAnswer}>
        Submit
      </button>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default GameSimonSays;
