import React from "react";
import Tilt from "react-parallax-tilt";
import "./style.css";
import Link from "next/link";

export default function PhysicalProductCard({
  title,
  brand,
  price,
  image,
  id,
}) {
  return (
    <Link href={`/physical-product-page/product-details/${id}/${title
        .replaceAll(" ", "-")
        .toLowerCase()}`}>
      <Tilt
        className="background-stripes rounded-2xl parallax-effect-glare-scale bg-[#28282A] w-[206px] h-[303px] "
        perspective={4000}
        // tiltMaxAngleX={10}
        // tiltMaxAngleY={10}
        glareMaxOpacity={1}
        scale={1}
      >
        <div className="inner-element flex  flex-col">
          <div className="flex flex-col justify-center items-center gap-4">
            {/*text card*/}
            <img
              src={image}
              alt="cart-image"
              className="w-40 h-36"
            />
            <h1>{title.slice(0,15)}</h1>
            <span>{brand}</span>
          </div>
          <div className="flex justify-between px-10 mt-7">
            <p className="praice">${price}</p>
            <button type="button" className=" rounded-full hover:text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V15"
                  stroke="#BDFD00"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 12H15"
                  stroke="#BDFD00"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="12" cy="12" r="11.5" stroke="#BDFD00" />
              </svg>
            </button>
          </div>
        </div>
      </Tilt>
    </Link>
  );
}
