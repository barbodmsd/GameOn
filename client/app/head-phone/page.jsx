"use client";
import fetchData from "@/Utils/FetchData";
import React, { useEffect, useState } from "react";
import BestGames from "../physical-product-page/BestGames"; 
import ProductsList from "../physical-product-page/ProductsList";
import Banner from "../physical-product-page/Banner";
import Loading from "@/components/Loading";


export default function HeadPhones() {
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("products?key=physical");
        setProducts(res.data);
      } catch (error) {}
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
    <>
      {products ? (
        <div className='flex pl-10 mt-5 justify-between'>
          <div className='w-[80%]'>
            <Banner />
            <ProductsList />
          </div>
          <div className='w-[23%] h-[100%] bg-black rounded-l-2xl pb-5'>
            <div className='px-5 py-5 flex gap-5'>
              <p>Best Game</p>
              <div className='bg-[#BDFD00] w-7 h-5 rounded-2xl text-black flex justify-center items-center font-bold text-sm'>
                {bestGames?.length}
              </div>
            </div>
            {bestGames}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
