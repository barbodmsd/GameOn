import React from "react";
import Tilt from "react-parallax-tilt";
import "./style.css";

export default function index({title, brand,price,image}) {
  return (
    <Tilt
      className="background-stripes parallax-effect-glare-scale bg-[#7D8085] w-[300px] h-[400px] "
      perspective={4000}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareEnable={true}
      glareMaxOpacity={1}
      scale={1}
    >
      <div className="inner-element flex gap-40 flex-col">
        <div className="flex flex-col justify-center items-center gap-5">
          {/*text card*/}
          <img src={image} alt="cart-image" />
          <h1>{title}</h1>
          <span>{brand}</span>
        </div>
        <div className="flex justify-between px-10">
          <p className="praice">${price}</p>
          <button type="button" className=" hover:bg-black rounded-full hover:text-white">
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
  );
}
