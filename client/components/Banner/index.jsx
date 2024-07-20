import React from "react";
export const getData = async () => {
  try {
    const res = await fetch(process.env.API_URL + "banners");
    const data = await res.json();
    return data.data[1];
  } catch (error) {
    console.log({ error });
  }
};
export default async function Banner() {
  const banner = await getData();
  console.log(banner);
  return (
    <div className='w-full h-[300px] flex justify-between  rounded-2xl bg-bg-100'>
      <div className='text-black'>{banner.title}</div>
      <div className="w-[55%] -translate-y-12 h-[115%]">
        <img
          src={process.env.API_URL + banner.image}
          alt={banner.title}
          className="w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
}
