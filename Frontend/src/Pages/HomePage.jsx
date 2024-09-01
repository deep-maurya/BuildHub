import React from 'react'
import { Navbar } from '../Components/HomePage/Navbar'
import { Home } from '../Components/HomePage/Home'
import Courousel from '../Components/HomePage/Courousel'
import Courses from '../Components/HomePage/Courses'
import Features from '../Components/HomePage/Features'
import Footer from '../Components/HomePage/Footer'

export const HomePage = () => {
  return (
    <>
        <Navbar/>
        <Home/>
        <Courses/>
        <Features/>
        <Footer/>
    </>
  )
}
