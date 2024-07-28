"use client";

import React, { useEffect, useState } from "react";
import fetchData from "@/Utils/FetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ProductsList from "@/components/ProductsList";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function Home() {
  const [imageSlider, setImageSlider] = useState([]); // Initialize as empty array

  // Fetch sliders data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("sliders");
        setImageSlider(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Create SwiperSlide components
  const sliders = imageSlider.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        className="w-full h-96 rounded-xl"
        src={process.env.NEXT_PUBLIC_DB_HOST + e.image}
      />
    </SwiperSlide>
  ));

  return (
    <div className="px-8 mt-5 w-[1229px]">
      <div className="w-[1229px]">
        <Swiper className="w-full h-96" loop>
          {sliders}
        </Swiper>
      </div>
      <div className="w-[1229px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className=" w-full my-10"
        >
          <ProductsList />
        </Swiper>
      </div>
      <div className="h-56"> 2 baner</div>
      <div className="w-[1229px]">
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className=" w-full my-10"
        >
          <ProductsList/>
        </Swiper>
      </div>
      <div className="h-56"> boxs</div>
      <div className="w-[1229px]">
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className=" w-full my-10"
        >
          <ProductsList/>
        </Swiper>
      </div>
    </div>
  );
}
