import React from "react";

export default function index() {
  return (
    <div className="    w-[100%]">
        <div className="px-5 py-5 flex gap-5">
        <p>Best Game</p>
        <div className=" bg-[#BDFD00] w-7 h-5 rounded-xl text-black flex justify-center items-center font-bold text-sm">10 </div>
        </div>
      <div className="  flex items-center justify-between hover:bg-[#BDFD00] hover:text-black w-[100%] h-16 rounded-l-md">
        <div className="">
          <img src="" alt="test" />
        </div>
        <div className="">
          <p className=" text-sm">name test</p>
          <p className=" text-sm">yest</p>
        </div>
        <div className=" hidden  ">
          <p>test</p>
        </div>
        <div className=" bg-[#28282A] w-10 h-5 rounded-l-xl flex justify-center items-center">
          <svg
            className=" size-4"
            viewBox="0 0 9 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2.51639V3.59708H2.06844L3.82079 5.34942L3.0562 6.11347L0 3.05674L3.0562 0L3.82079 0.764049L2.06844 2.51639H9Z"
              fill="#7D8085"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
