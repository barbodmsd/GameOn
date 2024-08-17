import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";

export default function CardFavorite({ name, id, price, image }) {
  return (
    <Tilt
      perspective={4000}
      // tiltMaxAngleX={10}
      // tiltMaxAngleY={10}
      glareMaxOpacity={1}
      scale={1}>
      <div className='flex flex-col justify-center gap-5 items-center bg-bg-100 px-10 py-5 rounded-lg'>
        <img
          src={process.env.NEXT_PUBLIC_DB_HOST + image}
          alt='product-image'
          srcset=''
          className='w-28'
        />
        <span className='font-bold'>{name}</span>
        <span className='text-my-yellow'>${price}</span>
      </div>
    </Tilt>
  );
}
