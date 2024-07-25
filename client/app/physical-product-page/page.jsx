"use client";
import fetchData from "@/Utils/FetchData";
import { useEffect, useState } from "react";
import BestGames from "@/components/BestGames";
import ProductsList from "./ProductsList";

export default function PhysicalProductPage() {
  const [banner, setBanner] = useState();
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const resProducts = await fetchData("products");
        const resBanners = await fetchData("banners");
        setBanner(resBanners.data[1]);
        setProducts(resProducts.data.slice(0, 4));
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

  return (
    <div className=" flex pl-10 mt-5 gap-10 justify-between">
      <div>
        <div className=" w-full h-[350px]  flex justify-between gap-5 ">
          <div className="  bg-[#191919] rounded-2xl flex flex-wrap justify-center items-center gap-10 ">
            <div className="w-[350px] flex  flex-col justify-center items-center text-center gap-5">
              <h1 className=" text-3xl font-bold">{banner?.title}</h1>
              <p className=" text-xs">{banner?.description}</p>
              <button
                type="button"
                className=" bg-[#BDFD00] w-[40%] h-10 rounded-3xl text-black font-bold text-xs"
              >
                Get The Game
              </button>
            </div>
            <div className="w-[50%] -translate-y-5  h-[100%]">
              <img
                src={process.env.NEXT_PUBLIC_DB_HOST + banner?.image}
                alt="baner-image"
              />
            </div>
          </div>
        </div>
        <ProductsList />
      </div>
      <div className="w-[360px] h-[530px] bg-black rounded-l-2xl">
        <div className="px-5 py-5 flex gap-5">
          <p>Best Game</p>
          <div className=" bg-[#BDFD00] w-7 h-5 rounded-2xl text-black flex justify-center items-center font-bold text-sm">
            10{" "}
          </div>
        </div>
        {bestGames}
      </div>
    </div>
  );
}
