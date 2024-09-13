import React from 'react'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react'
import bg_image from '../../../public/back_2.jpg'

export function Home() {
  return (

    <>
      
      <div 
        style={{
            backgroundImage: `url(${bg_image})`,
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center"
        }} 
        className="relative isolate z-0 bg-white px-6 pt-14 lg:px-8">
        <div  className="relative mx-auto max-w-2xl py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
             Coaching Institute Managment System
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Smart Classes has everything to make your Tuition Class run smoothly. Our mission is to provide all possible features through one single platform.
            </p>
          </div>
        </div>
      </div>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#B6F2FF"><path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path><path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path><path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path><path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path></svg>
    </>
  )
}
