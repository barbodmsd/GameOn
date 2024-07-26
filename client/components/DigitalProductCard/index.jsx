import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import Tilt from "react-parallax-tilt";
export default function DigitalProductCard({ title, img, id, price, platform }) {
//   const router = useRouter();
  const handleClick = () => {
    // add to cart
  };

  return (
    <div
    className='w-[150px]  min-h-[90px] overflow-hidden rounded-md relative flex flex-col gap-3'>
            <Tilt>
      <Link href={ `/digital-product-page/product-details/${id}/${title.replaceAll(" ", "-").toLowerCase()}`}>
          <img
            className='rounded-md w-[180px] h-[220px]'
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
              <h6>{title?.slice(0, 5)}</h6>
              <p className='text-txt'>{platform?.slice(0, 5)}</p>
            </div>
            <button
              onClick={handleClick}
              className=' rounded-full px-3 p-1 border border-my-yellow text-my-yellow'>
              +
            </button>
          </div>
        </div>
  );
}
