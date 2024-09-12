import React from 'react'
import noaccess from '../../../public/website.png'
export const SessionDetails = () => {
  return (
    <>
        <div className="flex flex-col items-center pb-10 rounded-s-xl p-5 py-9 bg-white">
            <img className="w-24 h-24 mt-10 mb-3 mb-5" src={noaccess} alt="Bonnie image"/>
            <h1 className='mb-10 font-medium text-center text-neutral-500 text-xl'>oops!.. some issue it their, either no permission to use this page or invalid Session ID</h1>
        </div>
    </>
  )
}
