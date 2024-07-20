"use client"

import fetchData from "@/Utils/FetchData";
import { useEffect, useState } from "react";

export default function DigitalProducts() {
  const [banner,setBanner] = useState()
  console.log(banner)
  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetchData("banners")
        setBanner(res.data[0])
      } catch (error) {
        console.log(error)
      }
    })()
  },[])
  return (
    <div className="h-screen px-8 mt-5 flex justify-between gap-5 ">
      <div className="w-full max-h-[300px] bg-[#191919] rounded-2xl flex justify-around items-center ">
        <div className="w-[370px] h-[200px] flex  flex-col justify-center items-center gap-5">
        <h1 className=" text-3xl">{banner?.title}</h1>
        <p className=" text-xs">{banner?.description}</p>
        <button type="button" className=" bg-[#BDFD00] p-2 rounded-2xl text-black font-bold" >Get The Game</button>
        </div>
        <div className="w-[55%] -translate-y-1 h-[115%]">
          <img src={"http://localhost:7000/"+banner?.image} alt="baner-image" className=" w-[90%] h-[90%]" />
        </div>
      </div>
      <div className="w-[230px] h-[530px] bg-black rounded-l-2xl">
      
      </div>
    </div>
  );
}
