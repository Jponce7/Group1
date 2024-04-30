import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage.jsx';
import {selectUsers} from './store/usersSlice.js';
import { useSelector } from 'react-redux';
import MainMenu from './views/MainMenu';
import CardMatching from './views/CardMatching';
import RevealthePath from './views/RevealthePath';
import SimonSays from './views/SimonSays';
import MissingLetters from './views/MissingLetters';
import SettingsPage from './views/SettingsPage';



function App() {

  const user = useSelector(selectUsers);

  return (
    <>
      {user.currentUser ?  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/cardmatching" element={<CardMatching />} />
          <Route path="/revealthepath" element={<RevealthePath />} />
          <Route path="/simonsays" element={<SimonSays />} />
          <Route path="/missletters" element={<MissingLetters />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>:
      <LoginPage />}
      
        
    </>
  )
}

export default App
