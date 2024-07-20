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
    <div className="h-screen px-8 mt-5 flex justify-between gap-5">
      <div className="w-full max-h-[300px] bg-[#191919] rounded-2xl flex justify-around  ">
        <div>
        <h1>{banner?.title}</h1>
        <p>{banner?.description}</p>
        <button type="button">Get The Game</button>
        </div>
        <div>
          <img src={"http://localhost:7000/"+banner?.image} alt="baner-image" className="w-" />
        </div>
      </div>
      <div className="w-[230px] h-[530px] bg-black rounded-l-2xl">
      
      </div>
    </div>
  );
}
