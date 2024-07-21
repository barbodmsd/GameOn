import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import Tilt from "react-parallax-tilt";
export default function CDCard({ title, img, id, price, platform }) {
//   const router = useRouter();
  const handleClick = () => {
    // add to cart
  };

  return (
    <div
    className='w-[250px]  min-h-[90px] overflow-hidden rounded-md relative flex flex-col gap-3'>
            <Tilt>
      <Link href={ `/games/product-details/${id}/${title.replaceAll(" ", "-").toLowerCase()}`}>
          <img
            width={"100%"}
            className='rounded-md'
            height={"100%"}
            src={img}
            alt={title}
          />
      </Link>
    </Tilt>


          <span className='absolute top-1 left-1 bg-gray-600 px-1 rounded text-my-yellow'>
            ${price}
          </span>
          <div className='flex justify-between w-[100%] items-center'>
            <div>
              <h6>{title.slice(0, 5)}</h6>
              <p className='text-txt'>{platform.slice(0, 5)}</p>
            </div>
            <div
              onClick={handleClick}
              className=' cursor-pointer border rounded-full px-1.5 text-my-yellow border-my-yellow flex justify-center '>
              +
            </div>
          </div>
        </div>
  );
}
