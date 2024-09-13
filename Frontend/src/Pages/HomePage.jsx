import React from 'react'
import { Navbar } from '../Components/HomePage/Navbar'
import { Home } from '../Components/HomePage/Home'
import Features from '../Components/HomePage/Features'
import Footer from '../Components/HomePage/Footer'
import { Feature2 } from '../Components/HomePage/Feature2'

export const HomePage = () => {
  return (
    <>
        <Navbar/>
        <Home/>
        <Features/>
        <Feature2/>
        <Footer/>
    </>
  )
}
