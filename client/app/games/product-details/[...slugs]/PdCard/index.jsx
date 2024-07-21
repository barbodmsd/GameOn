import React from 'react'
import ppp from '@/public/pp.jpg'
export default function PdCard() {
  return (
    <section className='w-[100%] h-[400px] flex gap-3 items-center  p-2'>
      {/* left side */}
      <section className='w-[78%] h-[100%] relative'>
        <div className='h-[50%] w-[100%] bg-my-yellow '>s</div>
        {/* product details */}
        <section className='flex justify-between w-[100%] h-[100%] absolute top-0 '>
          {/* img */}
          <div className='w-[40%] h-[100%]'><img src={ppp} alt='sdsd' width='100%' height='100%' /></div>
          {/* text  */}
          <div className='flex flex-col justify-between w-[58%] h-[100%]'>
            {/* top side */}
            <div className='flex justify-between w-[100%] h-[50%] p-5'>
              {/* title and platform */}
              <div className='flex flex-col gap-3 justify-center'>
                <h2 className='text-4xl text-black font-bold'>title</h2>
                <p className='text-txt text-xl'>platform</p>
                <span className='rounded-full px-3 py-1 text-black bg-yellow-200'>NEW GAME</span>
              </div>
              {/* table */}
              <div className='w-[40%]  py-3 divide-y divide-txt flex flex-col items-center  rounded-2xl h-[80%] bg-bg-300'>
                <div className='flex px-3  w-[100%] justify-between'>
                  <h5 className='text-txt'>key</h5>
                  <h6 className='text-txt'>value</h6>
                </div>
                <div className='flex px-3 w-[100%] justify-between'>
                  <h5 className='text-txt'>key</h5>
                  <h6 className='text-txt'>value</h6>
                </div>
                <div className='flex px-3 w-[100%] justify-between'>
                  <h5 className='text-txt'>key</h5>
                  <h6 className='text-txt'>value</h6>
                </div>
                <div className='flex px-3 w-[100%] justify-between'>
                  <h5 className='text-txt'>key</h5>
                  <h6 className='text-txt'>value</h6>
                </div>
              </div>
            </div>
            {/* bottom side */}
            <div className='flex justify-between w-[100%] h-[49%] p-5'>
               {/* title and platform */}
               <div className='flex flex-col gap-2 justify-between'>
                {/* title and description */}
                <div>
                <h2>title</h2>
                <p>platform</p>
                </div>
                {/* button and add to cart */}
                <div className='flex flex-col gap-3 '>
                  <div>price</div>
                  <div className='flex gap-3'>
                    <div >button</div>
                    <div >button</div>
                  </div>
                </div>
              </div>
              {/* table */}
              <div className='w-[40%] rounded-2xl h-[100%] bg-slate-800'></div>
            </div>
          </div>
        </section>
      </section>
      {/* right side */}
      <div className='flex flex-col gap-4 w-[20%] h-[100%]  bg-gray-500'>j</div>
    </section>
  )
}
