"use client";
import DigitalProductCard from "@/components/DigitalProductCard";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";
import Next from "./next";
import Prev from "./prev";


export default function Slider() {
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + "products");
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  const items = products?.map((e, index) => (
    <SwiperSlide key={index}>
      <DigitalProductCard
        img={process.env.NEXT_PUBLIC_DB_HOST + e?.images[0]}
        platform={e?.detailgames[0]?.platform}
        price={e?.price}
        title={e?.title}
        id={e._id}
      />
    </SwiperSlide>
  ));
  return (
    <div div className='bg-bg-100 p-5 w-[1000px] my-10 h-[400px] rounded-2xl'>
      <div className='flex w-full justify-between'>
        <h2 className='text-xl font-bold'>Our Games</h2>
        <div className='flex gap-1 '>
            <span className="prev p-2 border cursor-pointer text-my-yellow border-my-yellow rounded-full"><Prev/></span>
            <span className="next p-2 border cursor-pointer text-my-yellow border-my-yellow rounded-full "><Next/></span>
        </div>
      </div>
      <Swiper
        navigation={{
            nextEl:'.next',
            prevEl:'.prev',
        }}
        loop={true}
        slidesPerView={5}
        pagination={true}
        modules={[Navigation]}
        className='game-product'>
        {items}
      </Swiper>
    </div>
  );
}
