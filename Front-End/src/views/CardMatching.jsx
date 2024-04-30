import React from 'react';
import ExitButton from '../components/ExitButton'; 

function CardMatching() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}> {/* Ensuring the parent has a relative position */}
      <ExitButton />
      <h1>Card Matching</h1>
      <p></p>
    </div>
  );
}

export default CardMatching;
