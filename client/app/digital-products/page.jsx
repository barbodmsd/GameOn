"use client";
import fetchData from "@/Utils/FetchData";
import { useEffect, useState } from "react";
import Card from "./Card";
import Tilt from "react-parallax-tilt";

export default function DigitalProducts() {
  const [banner, setBanner] = useState();
  const [productsCard, setProductsCard] = useState();
  console.log(productsCard);
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
  const cardDtyle = productsCard?.map((e, index) => (
    <Card
      key={index}
      title={e.title}
      brand={e.brand}
      price={e.price}
      image={"http://localhost:7000/" + e.images[1]}
    />
  ));
  return (
    <div className="px-8 mt-5">
      <div className=" h-[300px] flex justify-between gap-5 ">
        <div className="w-full  bg-[#191919] rounded-2xl flex justify-around items-center ">
          <div className="w-[350px] h-[200px] flex  flex-col justify-center items-center text-center gap-5">
            <h1 className=" text-3xl font-bold">{banner?.title}</h1>
            <p className=" text-xs">{banner?.description}</p>
            <button
              type="button"
              className=" bg-[#BDFD00] p-2 rounded-2xl text-black font-bold"
            >
              Get The Game
            </button>
          </div>
          <div className="w-[55%] -translate-y-1 h-[115%]">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <img
                src={"http://localhost:7000/" + banner?.image}
                alt="baner-image"
                className=" w-[90%] h-[90%]"
              />
            </Tilt>
          </div>
        </div>
        <div className="w-[230px] h-[530px] bg-black rounded-l-2xl"></div>
      </div>
      <div className="">{cardDtyle}</div>
    </div>
  );
}
