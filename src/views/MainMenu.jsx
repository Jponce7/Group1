import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import doorImage from '../assets/door.png';
import { useSelector } from 'react-redux';

function MainMenu() {
  const textStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    transform: 'rotate(-2deg)',
    display: 'block',
    marginTop: '20px',
    textTransform: 'uppercase',
    color: 'white',
  };

  const boxStyle = {
    padding: '20px',
    height: '1000px',
    textAlign: 'center',
    border: '0px solid black',
    borderRadius: '0px',
    cursor: 'pointer',
    background: `url(${doorImage}) center / cover no-repeat`,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '-150px',
  };

  // Get the active profile from Redux store
  const activeProfile = useSelector((state) => state.profiles.activeProfile);

  const getLevelInfo = (gameName) => {
    if (!activeProfile || !activeProfile.games || !activeProfile.games[gameName]) {
      return { easy: 1, hard: 1 };
    }
    const gameData = activeProfile.games[gameName];
    return {
      easy: gameData.easy?.level || 1,
      hard: gameData.hard?.level || 1,
    };
  };

  const gameNames = ['CardMatching', 'RevealThePath', 'SimonSays', 'MissingLetters'];
  const paths = ['/cardmatching', '/revealthepath', '/simonsays', '/missletters'];
  const displayNames = ['Card Matching', 'Reveal the Path', 'Simon Says', 'Missing Letters'];

  return (
    <div style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
      <Header pageTitle="Main Menu" />
      {activeProfile && (
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
            Welcome, {activeProfile.nickname}!
          </span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
          justifyContent: 'center',
        }}
      >
        <div style={containerStyle}>
          {paths.map((path, index) => {
            const gameName = gameNames[index];
            const levels = getLevelInfo(gameName);
            return (
              <Link key={index} to={path} style={{ width: '15%', textDecoration: 'none' }}>
                <div className="menu-box" style={boxStyle}>
                  <span style={textStyle}>{displayNames[index]}</span>
                  <div
                    style={{
                      marginTop: '10px',
                      color: 'white',
                      fontWeight: 'normal',
                      fontSize: '16px',
                    }}
                  >
                    Easy: {levels.easy} <br />
                    Hard: {levels.hard}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          to="/settings"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontSize: '24px',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <FontAwesomeIcon icon={faCog} />
        </Link>
        <h1 style={{ position: 'absolute', bottom: '100px' }}>Welcome to SpectRoom</h1>
      </div>
    </div>
  );
}

export default MainMenu;
