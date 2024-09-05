import React from 'react'
import { Layout } from '../../Components/Panel/Layout'
import { ProfileUpdate } from '../../Components/Utils/ProfileUpdate'
import Batch from '../Components/Batch'


export const CoursePageInstructor = () => {
  
  return (
    <Layout For='instructor'>
          <Batch/>
    </Layout>
  )
}
