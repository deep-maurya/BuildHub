// src/routers/All_Router.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../User/Pages/LoginPage';
import { RegisterPage } from '../User/Pages/RegisterPage';
import { ForgetPasswordPage } from '../Pages/ForgetPasswordPage';
import { PagenotFound } from '../Components/HomePage/PagenotFound';
import { LoginPageAdmin } from '../Admin/Pages/LoginPageAdmin';
import { LoginPageInstructor } from '../Instructor/Pages/LoginPageInstructor';
import { HomePage } from '../Pages/HomePage';
import { Dashboard } from '../User/Pages/Dashboard';
import { Sessions } from '../User/Pages/Sessions';
import { ProfilePage } from '../User/Pages/ProfilePage';
export const All_Router = () => {
  return (

    <Routes>
      {/* Protected Route */}
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/session" element={<Sessions/>} />
      <Route path="/session/:session_id" element={<Sessions/>} />

      {/* Routes for User */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Routes for Admin */}
      <Route path='/admin' element={<LoginPageAdmin />} />

      {/* Routes for Instructor */}
      <Route path='/instructor' element={<LoginPageInstructor />} />

      {/* Common Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/forget_password' element={<ForgetPasswordPage />} />
      <Route path='/forget_password/:token' element={<ForgetPasswordPage />} />
      <Route path='/profile' element={<ProfilePage />} />

      
      {/* Fallback Route */}
      <Route path='/*' element={<PagenotFound />} />
    </Routes>
   
  );
};
