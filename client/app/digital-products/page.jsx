"use client";
import fetchData from "@/Utils/FetchData";
import { useEffect, useState } from "react";
import Card from "./Card";
import Tilt from "react-parallax-tilt";
import CardBest from "./CardBest";
import Products from "./Productss"

export default function DigitalProducts() {
  const [banner, setBanner] = useState();
  const [productsCard, setProductsCard] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("banners");
        setBanner(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("products");
        setProductsCard(res.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const cardBest = productsCard?.map((e, index) => (
    <CardBest
      id={e?._id}
      key={index}
      title={e?.title}
      brand={e?.brand}
      price={e?.price}
      image={"http://localhost:7000/" + e?.images[1]}
    />
  ));

  return (
    <div className="px-8 mt-5">
      <div className=" h-[250px]  flex justify-between gap-5 ">
        <div className="w-full  bg-[#191919] rounded-2xl flex flex-wrap justify-center items-center gap-10 ">
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
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <img
                src={"http://localhost:7000/" + banner?.image}
                alt="baner-image"
              />
            </Tilt>
          </div>
        </div>
        <div className="w-[280px] h-[530px] bg-black rounded-l-2xl">
          <div className="px-5 py-5 flex gap-5">
            <p>Best Game</p>
            <div className=" bg-[#BDFD00] w-7 h-5 rounded-2xl text-black flex justify-center items-center font-bold text-sm">
              10{" "}
            </div>
          </div>
          {cardBest}
        </div>
      </div>
      <Products/>
    </div>
  );
}
