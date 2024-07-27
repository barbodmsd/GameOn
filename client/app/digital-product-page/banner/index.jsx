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
  return <div className="w-full h-[350px] flex gap-2">
    <div className="w-[40%] bg-white h-[100%]"></div>
    <div className="w-[60%] bg-white h-[100%]"></div>
  </div>;
}
