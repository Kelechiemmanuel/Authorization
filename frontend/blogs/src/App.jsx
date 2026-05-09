import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Update from './pages/Update';
import Draft from './pages/Draft';
import Published from './pages/Published';
import NewsLetter from './pages/NewsLetter';
import Sidebar from './components/Sidebar';

const App = () => {
    const [theme, setTheme] = useState (
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])
    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return (
    <div className=''>
    <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} theme={theme}/>
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
                <Dashboard toggleTheme={toggleTheme} theme={theme}/>
            </ProtectedRoute>} 
         />
         <Route 
            path='/create-post'
            element={<ProtectedRoute>
                <CreatePost />
            </ProtectedRoute>} 
         />
         <Route 
            path='/update-post'
            element={<ProtectedRoute>
                <Update />
            </ProtectedRoute>} 
         />
         <Route 
            path='/draft'
            element={<ProtectedRoute>
                <Draft />
            </ProtectedRoute>} 
         />
         <Route 
            path='/published'
            element={<ProtectedRoute>
                <Published />
            </ProtectedRoute>} 
         />
         <Route 
            path='/newsletter'
            element={<ProtectedRoute>
                <NewsLetter />
            </ProtectedRoute>} 
         />
       </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App