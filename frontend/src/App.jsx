import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, ischeckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();  //check if the user is authenticated
  },[checkAuth])

  {/*we are checking if the user is authenticated and if the user is not authenticated and  then show the loading screen*/ }
  if (ischeckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  )

  console.log(authUser);
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to='/login' />}></Route>
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />}></Route>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />}></Route>
        <Route path='/settings' element={<SettingsPage />}></Route>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />}></Route>

      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>

  )
}

export default App;