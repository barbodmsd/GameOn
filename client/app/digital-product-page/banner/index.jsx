"use client";
import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion'

export default function GameBanner() {
  const [banners, setBanners] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST+'banners');
        const data = await res.json();
        setBanners(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {banners ? (
        <div className='w-full h-[350px] flex gap-2'>
          {/* left side */}
          <motion.div initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} className='w-[40%] h-[100%] flex flex-col gap-1 items-center rounded-2xl bg-bg-300  text-left'>
            {/* image */}
            <img
              src={process.env.NEXT_PUBLIC_DB_HOST + banners[2]?.image}
              alt={banners[2]?.title}
              className='w-[100%] scale-110  object-cover rounded-2xl -translate-y-2'
            />
            {/* text */}
            <div className='w-full flex flex-col gap-3 items-start p-5'>
              <h2 className='text-2xl  font-bold'>{banners[2]?.title}</h2>
              <h6 className='text-xs '>
                {banners[2]?.description.slice(0, 100)}
              </h6>
              <button className='btn-focus border-none hover:scale-105 duration-300'>
                GET THE GAME
              </button>
            </div>
          </motion.div>
          {/* right side */}
          <motion.div initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} className='w-[60%] flex rounded-2xl bg-bg-300 h-[100%]'>
            <div className='flex  justify-center flex-col gap-5 pl-3 w-[50%]'>
              <h2 className='text-2xl  font-bold'>{banners[3]?.title}</h2>
              <h6 className='text-xs '>{banners[3].description}</h6>
              <div>
                <button className='btn-focus border-none hover:scale-105 duration-300'>
                  GET THE GAME
                </button>
              </div>
            </div>
            <div className='w-[50%] h-[100%]'>
              <img
                src={process.env.NEXT_PUBLIC_DB_HOST + banners[3]?.image}
                alt={banners[3]?.title}
                className='w-[75%] -translate-y-6 object-cover'
              />
            </div>
          </motion.div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
  );
}
