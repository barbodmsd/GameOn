import React from "react";
export const getData = async (index) => {
  try {
    const res = await fetch(process.env.API_URL + "banners");
    const data = await res.json();
    return data.data[index];
  } catch (error) {
    console.log({ error });
  }
};
export default async function Banner({index}) {
  const banner = await getData(index);
  return (
    <div className='w-full h-[300px] flex justify-between  rounded-2xl bg-bg-100'>
      {/* text */}
      <div className=' gap-2 text-center w-[40%] h-[100%] p-5 flex flex-col justify-center items-center'>
        <h2 className="font-bold text-2xl mb-2">{banner?.title}</h2>
        <h5 className="text-xs text-center ">{banner?.description}</h5>
        <button className="bg-my-yellow mt-2 animate-bounce text-black py-2 px-4 rounded-full font-bold ">Get The Game </button>
      </div>
      {/* image */}
      <div className='w-[55%] -translate-y-12 h-[115%]'>
        <img
          src={process.env.API_URL + banner?.image}
          alt={banner?.title}
          className='w-[100%] h-[100%]'
        />
      </div>
    </div>
  );
}
