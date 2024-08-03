import { useState } from 'react'
import './App.css'
import { AllRouter } from './Routes/AllRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AllRouter/>
    </>
  )
}

export default App
