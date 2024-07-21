import React from "react";
import Atropos from "atropos/.";
export default function PdCard({ product }) {
  const {
    images,
    platform,
    title,
    price,
    description,
    reigen,
    ege,
    language,
    detailSistem,
  } = product;
  const { ram, cpu, gpu, hard } = detailSistem[0];
  return (
    <section className='w-[100%] h-[400px] flex gap-3 items-center  p-2'>
      {/* left side */}
      <section className='w-[78%] h-[100%] relative'>
        <div className='h-[50%] w-[100%] bg-my-yellow ' />
        {/* product details */}
        <section className='flex justify-between w-[100%] h-[100%] absolute top-0 '>
          {/* img */}
          <div className='w-[40%] p-3 h-[100%]'>
            <Atropos className='atropos w-[100%] h-[100%]'>
              <div className={"atropos-scale"}>
                <div className={"atropos-rotate"}>
                  <div className={"atropos-inner"}>
                    <img
                      alt={title}
                      src={"http://localhost:7000" + images[0]}
                      data-atropos-offset='-5'
                      width='100%'
                      height='100%'
                    />
                  </div>
                </div>
              </div>
            </Atropos>
          </div>
          {/* text  */}
          <div className='flex flex-col justify-between w-[58%] h-[100%]'>
            {/* top side */}
            <div className='flex justify-between w-[100%] h-[50%] p-5'>
              {/* title and platform */}
              <div className='flex flex-col gap-3 justify-center'>
                <h2 className='text-4xl text-black font-bold'>{title}</h2>
                <p className='text-txt text-xl'>{platform}</p>
                <span className='rounded-full flex justify-center items-center py-1 text-black bg-yellow-200'>
                  NEW GAME
                </span>
              </div>
              {/* table */}
              <div className='w-[40%] text-sm  py-2 divide-y divide-txt flex flex-col items-center  rounded-2xl h-[80%] bg-bg-300'>
                <div className='flex px-3 py-0.5  w-[100%] justify-between'>
                  <h5 className='text-txt'>Platform</h5>
                  <h6 className='text-txt'>{platform}</h6>
                </div>
                <div className='flex px-3 py-0.5 w-[100%] justify-between'>
                  <h5 className='text-txt'>Language</h5>
                  <h6 className='text-txt'>{language}</h6>
                </div>
                <div className='flex px-3 py-0.5 w-[100%] justify-between'>
                  <h5 className='text-txt'>Age</h5>
                  <h6 className='text-txt'>{ege}</h6>
                </div>
                <div className='flex px-3 py-0.5 w-[100%] justify-between'>
                  <h5 className='text-txt'>Region</h5>
                  <h6 className='text-txt'>{reigen}</h6>
                </div>
              </div>
            </div>
            {/* bottom side */}
            <div className='flex justify-between w-[100%] h-[49%] p-5'>
              {/* title and button */}
              <div className='flex flex-col w-[50%] gap-2 justify-between'>
                {/* title and description */}
                <div>
                  <h2 className='text-white font-bold text-xl'>{title}</h2>
                  <p className='text-txt text-xs '>
                    {description.slice(0, 100)}
                  </p>
                </div>
                {/* button and add to cart */}
                <div className='flex flex-col gap-3 '>
                  <p className='text-xl text-my-yellow font-bold'>$ {price}</p>
                  <div className='flex gap-3 items-center'>
                    <button className='bg-my-yellow mt-2 hover:scale-110 duration-300 text-black py-2 px-4 rounded-full font-bold '>
                      Order Now
                    </button>
                    <div className='flex gap-2'>
                      <button className='rounded-full px-3 p-1 border border-my-yellow'>
                        +
                      </button>
                      <button className='rounded-full px-3 p-1 border border-my-yellow'>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* table */}
              <div className='w-[40%] text-sm  py-2 divide-y divide-txt flex flex-col items-center  rounded-2xl h-[80%] bg-bg-300'>
                <div className='flex px-3 py-0.5  w-[100%] justify-between'>
                  <h5 className='text-txt'>{ram.name}</h5>
                  <h6 className='text-txt'>{ram.value}</h6>
                </div>
                <div className='flex px-3 py-0.5 w-[100%] justify-between'>
                  <h5 className='text-txt'>{cpu.name}</h5>
                  <h6 className='text-txt'>{cpu.value}</h6>
                </div>
                <div className='flex px-3 py-0.5 w-[100%] justify-between'>
                  <h5 className='text-txt'>{gpu.name}</h5>
                  <h6 className='text-txt'>{gpu.value}</h6>
                </div>
                <div className='flex px-3 py-0.5 w-[100%] justify-between'>
                  <h5 className='text-txt'>{hard.name}</h5>
                  <h6 className='text-txt'>{hard.value}</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* right side */}
      <div className='flex flex-col px-2 items-center gap-4 w-[20%] h-[100%]'>
        <div className='w-[100%]  rounded-xl h-24 '>
          <img src={"http://localhost:7000/" + images[1]} alt={title} />
        </div>
        <div className='w-[100%]  rounded-xl h-24 '>
          <img src={"http://localhost:7000/" + images[2]} alt={title} />
        </div>
        <div className='w-[100%]  rounded-xl h-24 '>
          <img src={"http://localhost:7000/" + images[3]} alt={title} />
        </div>
      </div>
    </section>
  );
}
