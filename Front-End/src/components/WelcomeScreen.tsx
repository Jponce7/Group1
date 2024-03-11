import React from 'react';

const WelcomeScreen = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // This makes the div take up the full viewport height
      textAlign: 'center' // Centers the text inside the div elements
    }}>
      <h1>Welcome SpectRoom</h1>
      <button>Login</button>
      <button>Create Account</button>
      <p>Continue without Login</p>
    </div>
  );
}

export default WelcomeScreen;
