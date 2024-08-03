import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop:blur-sm '>
        <ScaleLoader color='#bdfd00' />
    </div>
  )
}
