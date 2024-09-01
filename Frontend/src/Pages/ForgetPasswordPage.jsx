import React from 'react'
import { Navbar } from '../Components/HomePage/Navbar'
import { ResetPassword } from '../Components/PasswordReset/ResetPassword'
import Footer from '../Components/HomePage/Footer'

export const ForgetPasswordPage = () => {
  return (
    <>
        <Navbar/>
        <ResetPassword/>
        <Footer/>
    </>
  )
}
