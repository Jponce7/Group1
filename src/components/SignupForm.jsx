import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { CirclePicker } from 'react-color';
import FullPageLoader from './FullPageLoader';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    parentName: '',
    address: '',
    phoneNumber: '',
    emergencyContact: '',
    doctorName: '',
    additionalInfo: [],
  });
  const [noPersonalData, setNoPersonalData] = useState(false);
  const [error, setError] = useState('');

  // State variable for Favorite Color
  const [favoriteColor, setFavoriteColor] = useState('#0000FF'); 

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleNoPersonalDataChange(e) {
    setNoPersonalData(e.target.checked);

    if (e.target.checked) {
      // Set additional fields to null
      setUserCredentials({
        ...userCredentials,
        parentName: null,
        address: null,
        phoneNumber: null,
        emergencyContact: null,
        doctorName: null,
        additionalInfo: [],
      });
    } else {
      // Reset fields to empty strings
      setUserCredentials({
        ...userCredentials,
        parentName: '',
        address: '',
        phoneNumber: '',
        emergencyContact: '',
        doctorName: '',
        additionalInfo: [],
      });
    }
  }

  function handleAdditionalInfoChange(index, e) {
    const newAdditionalInfo = [...userCredentials.additionalInfo];
    newAdditionalInfo[index] = e.target.value;
    setUserCredentials({ ...userCredentials, additionalInfo: newAdditionalInfo });
  }

  function handleAddField() {
    if (userCredentials.additionalInfo.length < 5) {
      setUserCredentials({
        ...userCredentials,
        additionalInfo: [...userCredentials.additionalInfo, ''],
      });
    }
  }

  function handleRemoveField(index) {
    const newAdditionalInfo = [...userCredentials.additionalInfo];
    newAdditionalInfo.splice(index, 1);
    setUserCredentials({ ...userCredentials, additionalInfo: newAdditionalInfo });
  }

  // Handler for Favorite Color
  function handleColorChange(color) {
    setFavoriteColor(color.hex);
  }

  async function setupUserInFirestore(userId, email) {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);

    const initialUserData = {
      email: email,
      parentName: userCredentials.parentName || null,
      address: userCredentials.address || null,
      phoneNumber: userCredentials.phoneNumber || null,
      emergencyContact: userCredentials.emergencyContact || null,
      doctorName: userCredentials.doctorName || null,
      additionalInfo: userCredentials.additionalInfo || [],
      profiles: [
        {
          id: 1,
          active: true,
          nickname: userCredentials.nickname || 'New Player',
          infoProvided: !noPersonalData,
          favoriteColor: favoriteColor, // Store favorite color
          games: {
            CardMatching: {
              easy: { level: 1, score: 0 },
              hard: { level: 1, score: 0 },
            },
            MissingLetters: {
              easy: { level: 1, score: 0 },
              hard: { level: 1, score: 0 },
            },
            RevealThePath: {
              easy: { level: 1, score: 0 },
              hard: { level: 1, score: 0 },
            },
            SimonSays: {
              easy: { level: 1, score: 0 },
              hard: { level: 1, score: 0 },
            },
          },
          achievements: {
            achievement01: false,
            achievement02: false,
            achievement03: false,
            achievement04: false,
            achievement05: false,
            achievement06: false,
            achievement07: false,
            achievement08: false,
            achievement09: false,
            achievement10: false,
          },
          lastLogin: new Date(),
          totalPlaytime: {
            CardMatching: 0,
            MissingLetters: 0,
            RevealThePath: 0,
            SimonSays: 0,
          },
        },
      ],
    };

    try {
      await setDoc(userRef, initialUserData);
      console.log('User document created successfully');
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (userCredentials.password !== userCredentials.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!userCredentials.nickname.trim()) {
      setError('Nickname is required');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );

      await setupUserInFirestore(userCredential.user.uid, userCredential.user.email);

      dispatch(setUser({ id: userCredential.user.uid, email: userCredential.user.email }));
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <FullPageLoader />}
      <form
        className="signup-form"
        onSubmit={handleSignup}
        style={{ backgroundColor: favoriteColor }}
      >
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}

        {/* Email */}
        <div className="form-control">
          <label>Email</label>
          <input
            onChange={handleCredentials}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            autoFocus
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label>Password</label>
          <input
            onChange={handleCredentials}
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="form-control">
          <label>Confirm Password</label>
          <input
            onChange={handleCredentials}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Nickname */}
        <div className="form-control">
          <label>Nickname</label>
          <input
            onChange={handleCredentials}
            type="text"
            name="nickname"
            placeholder="Enter your nickname"
            required
          />
        </div>

        {/* Favorite Color */}
        <div className="form-control">
          <label>Favorite Color</label>
          <CirclePicker
            color={favoriteColor}
            onChangeComplete={handleColorChange}
            colors={[
              '#0000FF', // Blue
              '#FF0000', // Red
              '#FFFF00', // Yellow
              '#008000', // Green
              '#800080', // Purple
              '#FFA500', // Orange
              '#FFC0CB', // Pink
              '#006400', // Dark Green
              '#89CFF0', // Baby Blue
              '#A52A2A', // Brown
            ]}
          />
        </div>

        {/* No Personal Data Checkbox */}
        <div className="form-control checkbox-control">
          <label>
            <input
              type="checkbox"
              checked={noPersonalData}
              onChange={handleNoPersonalDataChange}
            />{' '}
            I prefer not to provide additional personal data.
          </label>
        </div>

        {/* Additional Personal Data Fields */}
        {!noPersonalData && (
          <>
            {/* Parent's Name */}
            <div className="form-control">
              <label>Parent's Name</label>
              <input
                onChange={handleCredentials}
                type="text"
                name="parentName"
                placeholder="Enter parent's name"
              />
            </div>
            {/* Address */}
            <div className="form-control">
              <label>Address</label>
              <input
                onChange={handleCredentials}
                type="text"
                name="address"
                placeholder="Enter your address"
              />
            </div>
            {/* Phone Number */}
            <div className="form-control">
              <label>Phone Number</label>
              <input
                onChange={handleCredentials}
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
              />
            </div>
            {/* Emergency Contact */}
            <div className="form-control">
              <label>Emergency Contact</label>
              <input
                onChange={handleCredentials}
                type="text"
                name="emergencyContact"
                placeholder="Enter emergency contact"
              />
            </div>
            {/* Doctor's Name */}
            <div className="form-control">
              <label>Doctor's Name</label>
              <input
                onChange={handleCredentials}
                type="text"
                name="doctorName"
                placeholder="Enter doctor's name"
              />
            </div>

            {/* Additional Information */}
            <div className="additional-info-section">
              <label>Additional Information (Optional):</label>
              {userCredentials.additionalInfo.map((info, index) => (
                <div key={index} className="form-control additional-info">
                  <input
                    type="text"
                    placeholder={`Additional Info ${index + 1}`}
                    value={info}
                    onChange={(e) => handleAdditionalInfoChange(index, e)}
                  />
                  <button type="button" onClick={() => handleRemoveField(index)}>
                    Remove
                  </button>
                </div>
              ))}
              {userCredentials.additionalInfo.length < 5 && (
                <button type="button" onClick={handleAddField}>
                  Add More
                </button>
              )}
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-block">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
