import React from 'react'
import { Navbar } from '../../Components/HomePage/Navbar'
import { Login } from '../Components/Login'
import Footer from '../../Components/HomePage/Footer'

export const LoginPage = () => {
  return (
    <>
        <Navbar/>
        <Login/>
        <Footer/>
    </>
  )
}
