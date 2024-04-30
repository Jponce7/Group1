import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import doorImage from '../assets/door.png';

function MainMenu() {
  const textStyle = {
    fontWeight: 'bold', 
    fontSize: '24px', 
    transform: 'rotate(-2deg)', 
    display: 'block', 
    marginTop: '20px', 
    textTransform: 'uppercase' ,
    color: 'white'
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
    alignItems: 'center' 
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '-150px' 
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', height: '90vh', justifyContent: 'center' }}>
      <Header pageTitle="Main Menu" />
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      <div style={containerStyle}>
        {['/cardmatching', '/revealthepath', '/simonsays', '/missletters'].map((path, index) => (
            <Link key={index} to={path} style={{ width: '15%', textDecoration: 'none' }}>
            <div className="menu-box" style={boxStyle}>
                <span style={textStyle}>
                {['Card Matching', 'Reveal the Path', 'Simon Says', 'Missing Letters'][index]}
                </span>
            </div>
            </Link>
        ))}
        </div>

      </div>
      <Link to="/settings" style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        fontSize: '24px',
        color: 'black',
        textDecoration: 'none'
      }}>
        <FontAwesomeIcon icon={faCog} />
      </Link>
      <h1 style={{ position: 'absolute', bottom: '100px' }}>Welcome to SpectRoom</h1>
    </div>
  );
}

export default MainMenu;
