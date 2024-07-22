import React from "react";
import Tilt from "react-parallax-tilt";
import "./style.css";
import Link from "next/link";

export default function index({ title, brand, price, image,id }) {
  return (
    <Tilt
      className="background-stripes rounded-2xl parallax-effect-glare-scale bg-[#28282A] w-[250px] h-[290px] "
      perspective={4000}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareMaxOpacity={1}
      scale={1}
    >
      <Link href={`digital-products/product-details/${id}`}>
        <div className="inner-element flex gap-10 flex-col">
          <div className="flex flex-col justify-center items-center gap-2">
            {/*text card*/}
            <img
              src={image}
              alt="cart-image"
              className="w-40 h-36 -translate-y-10"
            />
            <h1>{title}</h1>
            <span>{brand}</span>
          </div>
          <div className="flex justify-between px-10">
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
      </Link>
    </Tilt>
  );
}
