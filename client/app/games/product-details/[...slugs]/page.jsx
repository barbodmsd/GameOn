import React from 'react'
import PdCard from './PdCard'

export default async function GameProductDetails({params}) {
  const product =  params.slugs[0]
  return (
    <div className='h-screen px-8 mt-5 flex justify-between gap-3'>
      <PdCard/>
    </div>
  )
}
