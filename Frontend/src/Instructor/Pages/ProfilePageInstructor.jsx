import React from 'react'
import { Layout } from '../../Components/Panel/Layout'
import { ProfileUpdate } from '../../Components/Utils/ProfileUpdate'


export const ProfilePageInstructor = () => {
  
  return (
    <Layout For='instructor'>
          <ProfileUpdate For='instructor'/>
    </Layout>
  )
}
