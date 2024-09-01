import React from 'react'
import { Layout } from '../../Components/Panel/Layout'
import { Session } from '../Components/Sessions'


export const Sessions = () => {
  return (
    <Layout For='student'>
          <Session/>
    </Layout>
  )
}
