// src/routers/All_Router.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from '../User/Pages/RegisterPage';
import { ForgetPasswordPage } from '../Pages/ForgetPasswordPage';
import { HomePage } from '../Pages/HomePage';
import { Dashboard } from '../User/Pages/Dashboard';
import { Sessions } from '../User/Pages/Sessions';
import { ProfilePage } from '../User/Pages/ProfilePage';
import { DashboardAdmin } from '../Admin/Pages/DashboardAdmin';
import { Batch } from '../Admin/Pages/Batch';
import { TableTwo } from '../Admin/Components/TableTwo';
import { DashboardInstructor } from '../Instructor/Pages/DashboardInstructor';
import { LoginPage } from '../Pages/LoginPage';
import { PageNotFoundPage } from '../Pages/PageNotFoundPage';
import { ProfilePageInstructor } from '../Instructor/Pages/ProfilePageInstructor';
import { SessionsPageInstructor } from '../Instructor/Pages/SessionsPageInstructor';
import { CoursePageInstructor } from '../Instructor/Pages/CoursePageInstructor';
import { SessionDetails } from '../Instructor/Components/SessionDetails';
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
      <Route path='/admin/dashboard' element={<DashboardAdmin />} />
      <Route path='/admin/batch' element={<Batch />} />
      <Route path='/admin/test' element={<TableTwo />} />

      {/* Routes for Instructor */}
      <Route path='/instructor/dashboard' element={<DashboardInstructor />} />
      <Route path='/instructor/profile' element={<ProfilePageInstructor />} />
      <Route path='/instructor/course' element={<CoursePageInstructor/>} />
      <Route path='/instructor/session' element={<SessionsPageInstructor />} />
      <Route path='/instructor/session/:session_id' element={<SessionsPageInstructor />} />
      
      {/* Common Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/forget_password' element={<ForgetPasswordPage />} />
      <Route path='/forget_password/:token' element={<ForgetPasswordPage />} />
      <Route path='/profile' element={<ProfilePage />} />

      
      {/* Fallback Route */}
      <Route path='/*' element={<PageNotFoundPage />} />
    </Routes>
   
  );
};
