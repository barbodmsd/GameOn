"use client";

import { useEffect, useState } from "react";
import DigitalProductCard from "@/components/DigitalProductCard";
import Loading from "@/components/Loading";

export default function ProductsList() {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_DB_HOST + `products?key=digital&${value}=true`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value]);

  const items = products?.map((e, index) => (
    <DigitalProductCard
      id={e._id}
      key={index}
      platform={e.detailgames.platform}
      title={e.title}
      img={process.env.NEXT_PUBLIC_DB_HOST + e.images[0]}
      price={e.price}
    />
  ));

  return (
    <>
      {products ? (
        <div className='flex pl-7 pb-7 mt-12 gap-10 flex-wrap w-[100%]'>
          {/* text */}
          <div className='flex gap-6 '>
            <h4 className='text-2xl font-bold mr-3'>Our Games</h4>
            <button
              onClick={() => setValue("")}
              className={value == "" ? "btn-focus" : "btn-notFocus"}>
              All
            </button>
            <button
              onClick={() => setValue("top")}
              className={value == "top" ? "btn-focus" : "btn-notFocus"}>
              Top
            </button>
            <button
              onClick={() => setValue("populer")}
              className={value == "populer" ? "btn-focus" : "btn-notFocus"}>
              Popular
            </button>
            <button
              onClick={() => setValue("mostSuled")}
              className={value == "mostSuled" ? "btn-focus" : "btn-notFocus"}>
              Most Sold
            </button>
          </div>
          {/* items */}
          <div className='flex flex-wrap gap-5'>{items}</div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
