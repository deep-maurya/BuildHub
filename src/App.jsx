import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import { Profile } from './component/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Hero/>
      <Profile/>
    </>
  )
}

export default App
