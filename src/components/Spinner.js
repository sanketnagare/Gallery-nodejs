import React from 'react'
import './Spinner.css'
 
export default function Spinner() {
  return (
    <div className='flex flex-col gap-3 items-center mt-14'>
        <div className='spinner'></div>
        <p className='text-white text-lg font-semibold'>Loading...</p>
    </div>
  )
}