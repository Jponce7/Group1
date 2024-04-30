import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';

function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    if (confirm('Are you sure you want to sign out?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null));
        console.log("Signed Out");
      }).catch((error) => {
        console.error("Sign out error:", error);
      });
    }
  }

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button onClick={handleSignOut} style={{
        cursor: 'pointer',
        padding: '10px 20px',
        backgroundColor: '#f44336', 
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}>
        Logout
      </button>
    </div>
  );
}

export default Header;
