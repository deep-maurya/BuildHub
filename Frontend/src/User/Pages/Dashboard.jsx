import React from 'react'
import { Layout } from '../../Components/Panel/Layout'


export const Dashboard = () => {
  return (
    <Layout For='student'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example Cards */}
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg mb-2">Card 1</h3>
              <p>Content for card 1</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg mb-2">Card 2</h3>
              <p>Content for card 2</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold text-lg mb-2">Card 3</h3>
              <p>Content for card 3</p>
            </div>
          </div>
    </Layout>
  )
}
