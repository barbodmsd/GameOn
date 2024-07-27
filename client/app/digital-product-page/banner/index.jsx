import React from "react";

const getData = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + "banners");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export default async function GameBanner() {
  const banners = await getData();
  console.log({banners})
  return (
    <div className='w-full h-[350px] flex gap-2'>
      <div className='w-[40%] flex flex-col gap-2 items-center rounded-2xl bg-bg-300 h-[100%]'>
        <img
          src={process.env.NEXT_PUBLIC_DB_HOST+banners[0]?.image}
          alt={banners[0]?.title}
          className='w-[100%] h-[100%] object-cover rounded-2xl'
        />
      </div>
      <div className='w-[60%] flex rounded-2xl bg-bg-300 h-[100%]'>{banners[0]?.description}</div>
    </div>
  );
}
