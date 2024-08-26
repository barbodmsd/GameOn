import Loading from "@/components/Loading";
import fetchData from "@/Utils/FetchData";
import React, { useEffect, useState } from "react";
export default function Banner() {
  const [banner, setBanner] = useState();
  useEffect(() => {
    (async () => {
      const res = await fetchData("banners");
      setBanner(res.data[0]);
    })();
  }, []);
  return (
    <>
      {banner ? (
        <div className=' w-full h-[260px]  flex justify-between'>
          <div className='  bg-[#191919] rounded-2xl flex flex-wrap justify-center items-center gap-10 '>
            <div className='w-[350px] flex  flex-col justify-center items-center text-center gap-5 pb-5 pl-5'>
              <h1 className=' text-3xl font-bold'>{banner?.title}</h1>
              <p className=' text-xs'>{banner?.description}</p>
              <button
                type='button'
                className='hover:scale-105 duration-300 bg-[#BDFD00] w-[40%] h-10 rounded-3xl text-black font-bold text-xs'>
                Get The Game
              </button>
            </div>
            <div className=''>
              <img
              
                src={process.env.NEXT_PUBLIC_DB_HOST + banner?.image}
                alt='baner-image'
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
