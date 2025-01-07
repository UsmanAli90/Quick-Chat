import React from 'react'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/settings' element={<SettingsPage/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>

      </Routes>
    </div>

  )
}

export default App;