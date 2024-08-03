import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { HomePage } from '../Pages/HomePage'
import { GithubPage } from '../Pages/GithubPage'
import { PortfolioPage } from '../Pages/PortfolioPage'
export const AllRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/github/:github_id' element={<PortfolioPage/>}/>
        <Route path='/github' element={<GithubPage/>}/>
      </Routes>
    </>
  )
}
