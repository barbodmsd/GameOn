import React from 'react'
import PdCard from './PdCard'

export const getData=async(id)=>{
  try {
    const res=await fetch(`http://localhost:7000/products/${id}`)
    const data=await res.json()
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export default async function GameProductDetails({params}) {
  const product=await getData(params.slugs[0])
  return (
    <div className='h-screen px-8 mt-5 flex justify-between gap-3'>
      <PdCard product={product}/>
    </div>
  )
}
