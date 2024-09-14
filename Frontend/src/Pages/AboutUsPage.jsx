import React from 'react'
import { Navbar } from '../Components/HomePage/Navbar'
import Footer from '../Components/HomePage/Footer'
import { Feature2 } from '../Components/HomePage/Feature2'
import { Team } from '../Components/HomePage/Team'

export const AboutUsPage = () => {
  return (
    <>
        <Navbar/>
        <Team/>
        <Feature2/>
        <Footer/>
    </>
  )
}
