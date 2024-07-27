import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import { Profile } from './component/Profile'
import GithubFetch from './component/GithubFetch'
import { AllRouter } from './Routes/AllRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <AllRouter/>
    </>
  )
}

export default App
