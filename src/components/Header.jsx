import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config'; 
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { setActiveProfile, setProfiles } from '../store/profilesSlice';
import { persistor } from '../store/store'; 
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut(auth)
        .then(() => {
          dispatch(setUser(null));
          dispatch(setActiveProfile(null));
          dispatch(setProfiles([]));
          persistor.purge();
          console.log('Signed Out');
          navigate('/login');
        })
        .catch((error) => {
          console.error('Sign out error:', error);
        });
    }
  }

  function handleChangeProfile() {
    dispatch(setActiveProfile(null));
    navigate('/profileselection');
  }

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button
        onClick={handleChangeProfile}
        style={{
          cursor: 'pointer',
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
        }}
      >
        Change Profile
      </button>
      <button
        onClick={handleSignOut}
        style={{
          cursor: 'pointer',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
