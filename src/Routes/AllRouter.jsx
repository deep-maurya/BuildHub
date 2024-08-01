import React from 'react'
import {Route, Routes} from 'react-router-dom'
import GithubFetch from '../component/GithubFetch'
import { HomePage } from '../Pages/HomePage'
import Github from '../component/Github'
export const AllRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/github/:github_id' element={<GithubFetch/>}/>
        <Route path='/github' element={<Github/>}/>
      </Routes>
    </>
  )
}
