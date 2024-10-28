import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase/config';
import { setUser } from './store/usersSlice';
import { setProfiles, setActiveProfile } from './store/profilesSlice';
import LoginPage from './views/LoginPage';
import ProfileSelection from './views/ProfileSelection';
import MainMenu from './views/MainMenu';
import CardMatching from './views/CardMatching';
import RevealthePath from './views/RevealthePath';
import SimonSays from './views/SimonSays';
import MissingLetters from './views/MissingLetters';
import SettingsPage from './views/SettingsPage';
import DebugOverlay from './components/DebugOverlay';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);
  const activeProfile = useSelector((state) => state.profiles.activeProfile);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ id: firebaseUser.uid, email: firebaseUser.email }));
        if (!activeProfile) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setProfiles(userData.profiles || []));
            const active = userData.profiles.find(profile => profile.active);
            if (active) {
              dispatch(setActiveProfile(active));
            }
          }
        }
      } else {
        dispatch(setUser(null));
        dispatch(setProfiles([]));
      }
      setIsAuthChecked(true);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, activeProfile]);

  if (!isAuthChecked || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!user ? (
            // If not authenticated, show the login page
            <Route path="*" element={<LoginPage />} />
          ) : !activeProfile ? (
            // If authenticated but no active profile, show profile selection
            <>
              <Route path="/profileselection" element={<ProfileSelection />} />
              <Route path="*" element={<Navigate to="/profileselection" replace />} />
            </>
          ) : (
                      // Authenticated and has an active profile
            <>
              <Route path="/" element={<MainMenu />} />
              <Route path="/cardmatching" element={<CardMatching />} />
              <Route path="/revealthepath" element={<RevealthePath />} />
              <Route path="/simonsays" element={<SimonSays />} />
              <Route path="/missletters" element={<MissingLetters />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profileselection" element={<ProfileSelection />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
        <DebugOverlay />
      </BrowserRouter>
    </>
  );
}

export default App;