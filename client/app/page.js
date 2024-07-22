"use client";

import React, { useEffect, useState } from "react";
import Products from "./games/Products";
import Productss from "./digital-products/Productss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";



export default function Home() {
  // const [imageSlider,setImageSilder] = useState()
  // useEffect(()=>{
  //   (async()=>{
  //     try {
  //       const data = await fetch("http://localhost:7000/sliders")
  //       const res = data.json()
  //       setImageSilder(res.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()
  // },[])
  
  return (
    <div className=" px-8 mt-5">
      {/* <div className="w-[1129px]">
        <Swiper className=" w-full h-96 bg-white text-black">
          <SwiperSlide>sina</SwiperSlide>
          <SwiperSlide>sina</SwiperSlide>
        </Swiper>
      </div>
      <div>
        <Productss />
      </div>
      <div></div>
      <div>
        <Products />
      </div> */}
    </div>
  );
}
