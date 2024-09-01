import { useState } from 'react'
import './App.css'
import { All_Router } from './Routers/All_Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <All_Router/>
    </>
  )
}

export default App
