"use client";
import { fetchData } from "@/Utils/fetchhData";
import React, { useEffect, useState } from "react";

export default function GameBanner() {
  const [banners, setBanners] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + "banners");
        const data = await res.json();
        setBanners(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log({ banners });
  return (
    <>
      {banners ? (
        <div className='w-full h-[350px] flex gap-2'>
          {/* left side */}
          <div className='w-[40%] h-[100%] flex flex-col gap-1 items-center rounded-2xl bg-bg-300  text-left'>
            {/* image */}
            <img
              src={process.env.NEXT_PUBLIC_DB_HOST + banners[2]?.image}
              alt={banners[0]?.title}
              className='w-[100%] scale-110  object-cover rounded-2xl -translate-y-2'
            />
            {/* text */}
            <div className='w-full flex flex-col gap-3 items-start p-5'>
              <h2 className='text-2xl  font-bold'>{banners[2]?.title}</h2>
              <h6 className='text-xs '>{banners[2].description.slice(0,100)}</h6>
              <button className="btn-focus border-none hover:scale-105 duration-300">GET THE GAME</button>
            </div>
          </div>
          {/* right side */}
          <div className='w-[60%] flex rounded-2xl bg-bg-300 h-[100%]'></div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
