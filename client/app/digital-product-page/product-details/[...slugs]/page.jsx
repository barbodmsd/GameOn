import React from "react";
import PdCard from "./PdCard";
import Slider from "./slider";
import Loading from "@/components/Loading";

export const getData = async (id) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + `products/${id}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function GameProductDetails({ params }) {
  const product = await getData(params.slugs[0]);
  return (
    <>
      {product ? (
        <div className='min-h-screen w-full px-8 mt-5 '>
          <PdCard product={product} />
          <Slider />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
