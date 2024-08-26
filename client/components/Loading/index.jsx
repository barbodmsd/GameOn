import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='fixed bg-bg-100/70 z-[1000000] inset-0 flex justify-center items-center ' style={{'backdropFilter':'blur(6px)'}}>
        <ScaleLoader color='#bdfd00' />
    </div>
  )
}
