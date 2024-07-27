import React from "react";
import PdCard from "./PdCard";
import Slider from "./slider";

export const getData = async (id) => {
  try {
    const res = await fetch(`http://localhost:7000/products/${id}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function GameProductDetails({ params }) {
  const product = await getData(params.slugs[0]);
  return (
    <div className='min-h-screen w-full px-8 mt-5 '>
      <PdCard product={product} />
      <Slider />
    </div>
  );
}


