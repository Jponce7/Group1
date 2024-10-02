import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function SettingsPage() {
    const [isMusicOn, setMusicOn] = useState(true);
    const [isSoundOn, setSoundOn] = useState(true);
    const navigate = useNavigate(); 

    const handleToggleMusic = () => {
        setMusicOn(!isMusicOn);
    };

    const handleToggleSound = () => {
        setSoundOn(!isSoundOn);
    };

    const handleDeleteProfile = () => {
        if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            console.log("Profile would be deleted");
        }
    };
 
    const goBack = () => {
        navigate('/'); 
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={goBack} style={{
                position: 'absolute', 
                top: '10px', 
                left: '10px',
                backgroundColor: '#ccc',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer'
            }}>Back</button>
            <h1>Settings</h1>
            <div style={{ marginTop: '20px' }}>
                <h2>Sound Settings</h2>
                <label htmlFor="soundToggle">
                    Sound: {isSoundOn ? "On" : "Off"}
                    <input
                        type="checkbox"
                        id="soundToggle"
                        checked={isSoundOn}
                        onChange={handleToggleSound}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Music Settings</h2>
                <label htmlFor="musicToggle">
                    Music: {isMusicOn ? "On" : "Off"}
                    <input
                        type="checkbox"
                        id="musicToggle"
                        checked={isMusicOn}
                        onChange={handleToggleMusic}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={handleDeleteProfile}
                    style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                    Delete Profile
                </button>
            </div>
        </div>
    );
}

export default SettingsPage;
