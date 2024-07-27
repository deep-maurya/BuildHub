import React from 'react'
import {Route, Routes} from 'react-router-dom'
import GithubFetch from '../component/GithubFetch'
import { HomePage } from '../Pages/HomePage'
export const AllRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/github' element={<GithubFetch/>}/>
      </Routes>
    </>
  )
}
