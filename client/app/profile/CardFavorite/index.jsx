import React from 'react';
import Tilt from "react-parallax-tilt";

export default function CardFavorite() {
  return (
    <Tilt
    perspective={4000}
    // tiltMaxAngleX={10}
    // tiltMaxAngleY={10}
    glareMaxOpacity={1}
    scale={1}
  >
    <div className='flex flex-col justify-center items-center bg-bg-100 px-10 py-5 rounded-lg'>
        <img src="" alt="product-image" srcset="" />
        <span>name</span>
        <span>$ 100</span>
    </div>
    </Tilt>
  )
}
