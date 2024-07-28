"use client"
import fetchData from "@/Utils/FetchData";
import React, { useEffect, useState } from "react";
import BestGames from "./BestGames";
import ProductsList from "./ProductsList";
import Banner from "./Banner";


export default function PhysicalProductPage() {
  const [products, setProducts] = useState();

useEffect(() => {
  (async () => {
    try {
      const res = await fetchData("products?key=physical")
      setProducts(res.data)
    } catch (error) {
      
    }
  })();
}, []);

const bestGames = products?.map((product, index) => (
  <BestGames
    id={product._id}
    key={index}
    title={product.title}
    brand={product.brand}
    price={product.price}
    image={process.env.NEXT_PUBLIC_DB_HOST + product.images[0]}
  />
));
  return (
    <div className="flex pl-10 mt-5 justify-between">
      <div className="w-[80%]">
        <Banner />
        <ProductsList />
      </div>
      <div className="w-[23%] h-[100%] bg-black rounded-l-2xl pb-5">
        <div className="px-5 py-5 flex gap-5">
          <p>Best Game</p>
          <div className="bg-[#BDFD00] w-7 h-5 rounded-2xl text-black flex justify-center items-center font-bold text-sm">
            {bestGames?.length}
          </div>
        </div>
        {bestGames}
      </div>
    </div>
  );
}
