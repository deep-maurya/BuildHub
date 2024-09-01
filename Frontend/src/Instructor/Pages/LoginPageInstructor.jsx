import React from 'react'
import { Navbar } from '../../Components/HomePage/Navbar'
import { Login } from '../Components/Login'
import Footer from '../../Components/HomePage/Footer'

export const LoginPageInstructor = () => {
  return (
    <>
        <Navbar/>
        <Login/>
        <Footer/>
    </>
  )
}
