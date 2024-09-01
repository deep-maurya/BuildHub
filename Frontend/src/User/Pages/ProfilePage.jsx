import React from 'react'
import { Layout } from '../../Components/Panel/Layout'
import { ProfileUpdate } from '../../Components/Utils/ProfileUpdate'


export const ProfilePage = () => {
  return (
    <Layout For='student'>
          <ProfileUpdate For='student'/>
    </Layout>
  )
}
