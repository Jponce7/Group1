import React, { useState } from 'react';
import './App.css';
import Checkpoint from './Checkpoint';

const checkpoints = [
  { name: "Home", x: 50, y: 50 },
  { name: "Address 1", x: 250, y: 150 },
  { name: "Address 2", x: 450, y: 250 },
  // Add more checkpoints as needed
];

const App = () => {
  const [message, setMessage] = useState('');

  const handleClick = (name) => {
    setMessage(`You have reached ${name}`);
  };

  return (
    <div className="app">
      <div className="maze">
        {checkpoints.map((checkpoint, index) => (
          <Checkpoint
            key={index}
            name={checkpoint.name}
            x={checkpoint.x}
            y={checkpoint.y}
            onClick={handleClick}
          />
        ))}
      </div>
      {message && <div className="reward">{message}</div>}
    </div>
  );
};

export default App;
