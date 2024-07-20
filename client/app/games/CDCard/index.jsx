import React from "react";

export default function CDCard({ title, img, id, price, platform }) {
  return (
    <>
      <div
        className='w-[250px] h-[300px] rounded-md relative flex flex-col gap-3'
        >
        <img width={"100%"} height={"100%"} src={img} alt={title} />
        <span className='absolute top-1 left-1 bg-gray-800 p-1 rounded text-my-yellow'>
          ${price}
        </span>
      </div>
    </>
  );
}
