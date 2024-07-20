import React from "react";
import Tilt from 'react-parallax-tilt'
export default function CDCard({ title, img, id, price, platform }) {
  return (
    <Tilt>
      <div
        className='w-[250px] min-h-[90px] overflow-hidden rounded-md relative flex flex-col gap-3'
        >
        <img width={"100%"} className="rounded-md" height={"100%"} src={img} alt={title} />
        <span className='absolute top-1 left-1 bg-gray-600  rounded text-my-yellow'>
          ${price}
        </span>
        <div className="flex justify-between w-[100%] items-center">
            <div>
                <h6>{title.slice(0,5)}</h6>
                <p className="text-txt">{platform.slice(0,5)}</p>
            </div>
            <div  className=" border rounded-full px-1.5 text-my-yellow border-my-yellow flex justify-center ">+</div>
        </div>
      </div>
    </Tilt>
  );
}
