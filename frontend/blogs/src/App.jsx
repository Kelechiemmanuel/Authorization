import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />

         <Route 
            path='/profile'
            element={<ProtectedRoute>
                <Profile />
            </ProtectedRoute>} 
         />

         <Route 
            path='/dashboard'
            element={<ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>} 
         />
       </Routes>
    
    </BrowserRouter>
  )
}

export default App