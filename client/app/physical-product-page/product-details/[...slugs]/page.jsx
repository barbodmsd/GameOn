import React from 'react'
import PageCard from "./PageCard"

export const getData=async(id)=>{
  try {
    const res=await fetch(`http://localhost:7000/products/${id}`)
    const data=await res.json()
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export default async function ProductDetails({params}) {
  const product=await getData(params.slugs[0])
  

  return (
    <div>
      <PageCard  product={product}/>
    </div>
  )
}