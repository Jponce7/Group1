import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { selectUsers } from '../store/usersSlice';
import { setActiveProfile, setProfiles } from '../store/profilesSlice';
import { useNavigate } from 'react-router-dom';
import './ProfileSelection.css';

function ProfileSelection() {
  const [localProfiles, setLocalProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user.currentUser) {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.currentUser.id);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const profiles = userSnap.data().profiles || [];
            setLocalProfiles(profiles);
            dispatch(setProfiles(profiles)); 
          }
        } catch (error) {
          console.error("Error fetching profiles:", error);
          alert("Failed to load profiles. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfiles();
  }, [user.currentUser, dispatch]);

  const handleAddProfile = async () => {
    if (localProfiles.length < 4) {
      setIsLoading(true);
      const db = getFirestore();
      const userRef = doc(db, 'users', user.currentUser.id);
      
      const newProfile = {
        id: localProfiles.length + 1,
        active: false,
        nickname: `Player ${localProfiles.length + 1}`,
        games: {
          CardMatching: { easy: {level: 1, score: 0}, hard: {level: 1, score: 0} },
          MissingLetters: { easy: {level: 1, score: 0}, hard: {level: 1, score: 0} },
          RevealThePath: { easy: {level: 1, score: 0}, hard: {level: 1, score: 0} },
          SimonSays: { easy: {level: 1, score: 0}, hard: {level: 1, score: 0} },
        },
        achievements: {
          achievement01: false, achievement02: false, achievement03: false,
          achievement04: false, achievement05: false, achievement06: false,
          achievement07: false, achievement08: false, achievement09: false,
          achievement10: false,
        },
        lastLogin: new Date(),
        totalPlaytime: {
          CardMatching: 0, MissingLetters: 0, RevealThePath: 0, SimonSays: 0,
        },
      };

      try {
        await updateDoc(userRef, {
          profiles: arrayUnion(newProfile)
        });
        const updatedProfiles = [...localProfiles, newProfile];
        setLocalProfiles(updatedProfiles);
        dispatch(setProfiles(updatedProfiles));
      } catch (error) {
        console.error("Error adding new profile:", error);
        alert("Failed to add new profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Maximum number of profiles reached');
    }
  };

  const handleSelectProfile = async (profileId) => {
    setIsLoading(true);
    const db = getFirestore();
    const userRef = doc(db, 'users', user.currentUser.id);
    
    try {
      const updatedProfiles = localProfiles.map(profile => ({
        ...profile,
        active: profile.id === profileId,
        lastLogin: profile.id === profileId ? new Date() : profile.lastLogin
      }));
      
      await updateDoc(userRef, { profiles: updatedProfiles });
      
      setLocalProfiles(updatedProfiles);
      dispatch(setProfiles(updatedProfiles));
      
      const activeProfile = updatedProfiles.find(profile => profile.id === profileId);
      dispatch(setActiveProfile(activeProfile));
      
      navigate('/');
    } catch (error) {
      console.error("Error selecting profile:", error);
      alert("Failed to select profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-selection">
      <h1>Select a Profile</h1>
      <div className="profiles-container">
        {localProfiles.map((profile) => (
          <div key={profile.id} className="profile-card" onClick={() => handleSelectProfile(profile.id)}>
            <h3>{profile.nickname}</h3>
            {profile.active && <span>(Active)</span>}
          </div>
        ))}
        {localProfiles.length < 4 && (
          <div className="add-profile-card" onClick={handleAddProfile}>
            <span>+</span>
            <p>Add Profile</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSelection;