"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import fetchData from "@/Utils/FetchData";
import DigitalProductCard from "@/components/DigitalProductCard";

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
  console.log(products);
  const items = products?.map((e, index) => (
    <SwiperSlide key={index}>
      <DigitalProductCard
        img={process.env.NEXT_PUBLIC_DB_HOST + e?.images[0]}
        platform={e?.detailsGames[0]?.platform}
        price={e?.price}
        title={e?.title}
        id={e._id}
      />
    </SwiperSlide>
  ));
  return (
    <div div className='bg-bg-100 p-5 w-[1000px] my-10 h-[400px] rounded-2xl'>
      <Swiper pagination={true} modules={[Pagination]} className='game-product'>
        {items}
      </Swiper>
    </div>
  );
}
