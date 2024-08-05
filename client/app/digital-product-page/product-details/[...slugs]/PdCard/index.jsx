"use client";
import { useParams } from "next/navigation";
import Tilt from "react-parallax-tilt";
import { useSelector } from "react-redux";

export default function PdCard({ product,removeFromCart,addToCart,quantity }) {
  const { images, title, price, description, detailSistem, detailgames } =
    product;
  const { platform, reigen, ege, language } = detailgames[0];
  const { ram, cpu, gpu, hard } = detailSistem[0];
 
  return (
    <section className='w-[100%] h-[450px] flex gap-3 items-center  p-2'>
      {/* left side */}
      <section className='w-[78%] h-[100%] relative'>
        <div className='h-[50%] w-[100%] bg-my-yellow ' />
        {/* product details */}
        <section className='flex xl:justify-center xl:gap-2 justify-between w-[100%] h-[100%] absolute top-0 '>
          {/* img */}
          <div className='w-[40%] rounded-2xl p-3 h-[100%]'>
            <Tilt className='rounded-2xl w-[100%] h-[100%]'>
              <img
                className='rounded-2xl w-[100%] h-[100%]'
                src={process.env.NEXT_PUBLIC_DB_HOST + images[0]}
                alt={title}
              />
            </Tilt>
          </div>
          {/* text  */}
          <div className='flex flex-col justify-between w-[58%] h-[100%]'>
            {/* top side */}
            <div className='flex justify-between items-center w-[100%] h-[50%] p-5'>
              {/* title and platform */}
              <div className='flex flex-col gap-3 justify-center w-[40%]'>
                <h2 className='text-2xl text-black font-bold '>{title}</h2>
                <p className='text-txt text-xl font-bold'>{platform}</p>
                <span className='rounded-full w-[130px] flex justify-center items-center py-1 font-bold text-black bg-stone-600/50'>
                  NEW GAME
                </span>
              </div>
              {/* table */}
              <div className='w-[45%] text-sm  py-2 divide-y divide-txt flex flex-col items-center  rounded-2xl h-[65%] bg-bg-300'>
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
                    <button className='bg-my-yellow  animate-bounce mt-2  text-black py-2 px-4 rounded-full font-bold '>
                      Order Now
                    </button>
                    <div className='flex gap-2'>
                      <button
                        className='rounded-full px-3 p-1 border border-my-yellow text-my-yellow'
                        onClick={removeFromCart}>
                        -
                      </button>
                      {quantity&&<p>{quantity}</p>}
                      <button
                        className='rounded-full px-3 p-1 border border-my-yellow text-my-yellow'
                        onClick={addToCart}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* table */}
              <div className='w-[40%] text-sm  py-2 divide-y divide-txt flex flex-col items-center  rounded-2xl h-[65%] bg-bg-300'>
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
        <Tilt>
          <div className='w-[100%]  rounded-xl overflow-hidden h-24 '>
            <img
              src={process.env.NEXT_PUBLIC_DB_HOST + images[1]}
              alt={title}
              className='rounded-xl '
            />
          </div>
        </Tilt>
        <Tilt>
          <div className='w-[100%]  rounded-xl overflow-hidden h-24 '>
            <img
              src={process.env.NEXT_PUBLIC_DB_HOST + images[2]}
              alt={title}
              className='rounded-xl '
            />
          </div>
        </Tilt>
        <Tilt>
          <div className='w-[100%]  rounded-xl overflow-hidden h-24 '>
            <img
              src={process.env.NEXT_PUBLIC_DB_HOST + images[3]}
              alt={title}
              className='rounded-xl '
            />
          </div>
        </Tilt>
      </div>
    </section>
  );
}
