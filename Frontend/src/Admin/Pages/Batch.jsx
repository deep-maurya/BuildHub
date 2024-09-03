import React from 'react'
import CreateBatch from '../Components/CreateBatch'
import { Layout } from '../../Components/Panel/Layout'
import { TableTwo } from '../Components/TableTwo'

export const Batch = () => {
  return (
    <>
    <Layout For='admin'>
    <CreateBatch/>
    {/* <TableTwo/> */}
    </Layout>
    </>
  )
}
