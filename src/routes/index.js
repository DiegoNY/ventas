import React from 'react';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom'
import { HomePage } from './home/HomePage';
import { Login } from './login/LoginPage';
import { AuthProvider } from '../auth/auth';



function App() {

  

  return (
    <>
      <BrowserRouter>

        <AuthProvider>

          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Login />} />
            <Route path='/caja' element={<HomePage />} />
            <Route path='*' element={<HomePage />} />

          </Routes>

        </AuthProvider>
      
      </BrowserRouter>

    </>
  );
}

export default App;
