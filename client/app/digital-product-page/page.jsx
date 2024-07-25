"use client";
import Banner from "@/components/Banner";
import BestGames from "@/components/BestGames";
import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import fetchData from "@/Utils/FetchData";

export default function DigitalProductPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("products");
        setProducts(res.data.slice(4, 8));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const bestGames = products?.map((e, index) => (
    <BestGames
      id={e?._id}
      key={index}
      title={e?.title}
      brand={e?.brand}
      price={e?.price}
      image={process.env.NEXT_PUBLIC_DB_HOST + e?.images[0]}
    />
  ));
  return <>
  <div className='min-h-screen px-8 mt-5 flex justify-between gap-3'>
    {/* main */}
    <div className='w-full min-h-[300px]'>
    {/* <Banner index={1}/> */}
    {/* all the result cards */}
    <ProductsList/>
    </div>
    {/* aside */}
    <div className="w-[280px] h-[530px] bg-black rounded-l-2xl">
          <div className="px-5 py-5 flex gap-5">
            <p>Best Game</p>
            <div className=" bg-[#BDFD00] w-7 h-5 rounded-2xl text-black flex justify-center items-center font-bold text-sm">
              10{" "}
            </div>
          </div>
          {bestGames}
        </div>
  </div>
  </>;
}





















