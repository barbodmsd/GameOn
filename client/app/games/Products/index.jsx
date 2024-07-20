"use client";
import { useState,useEffect } from "react";

export default function Products() {
  
  return (
    <div className='mt-[20px]'>
      <div className='flex gap-2  items-center'>
        <h2 className='text-white text-2xl font-bold '>Our Games</h2>
        <button
          onChange={(e) => setValue(e.target.value)}
          className='focus:bg-my-yellow cursor-pointer focus:text-black transition  border flex items-center justify-center border-txt w-24 rounded-xl px-2 py-0.5 font-bold  text-txt'>
          Top
        </button>
        <button
          onChange={(e) => setValue(e.target.value)}
          className='focus:bg-my-yellow cursor-pointer focus:text-black transition  border flex items-center justify-center border-txt w-24 rounded-xl px-2 py-0.5 font-bold  text-txt'>
          Popular
        </button>
        <button
          onChange={(e) => setValue(e.target.value)}
          className='focus:bg-my-yellow cursor-pointer text-nowrap focus:text-black transition  border flex items-center justify-center border-txt w-24 rounded-xl px-2 py-0.5 font-bold  text-txt'>
          Most Sold
        </button>
      </div>
    </div>
  );
}
