"use client";

import { useEffect, useState } from "react";
import CDCard from "../CDCard";

export default function Products() {
  const [value, setValue] = useState("top");
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:7000/products?filters[${value}]=false`);
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value]);

  const items = products?.map((e, index) => (
    <CDCard
      id={e._id}
      key={index}
      platform={e.platform}
      title={e.title}
      img={"http://localhost:7000/" + e.images[0]}
      price={e.price}
    />
  ));
  
  return (
    <div className='flex pl-7 mt-12 gap-10 flex-wrap w-[100%]'>
      {/* text */}
      <div className='flex gap-6 '>
        <h4 className='text-2xl font-bold mr-3'>Our Games</h4>
        <button
          onClick={() => setValue("top")}
          className={value=='top'?'btn-focus':'btn-notFocus'}>
          Top
        </button>
        <button
          onClick={() => setValue("populer")}
          className={value=='populer'?'btn-focus':'btn-notFocus'}>
          Popular
        </button>
        <button
          onClick={() => setValue("mostSuled")}
          className={value=='mostSuled'?'btn-focus':'btn-notFocus'}>
          Most Sold
        </button>
      </div>
      {/* items */}
      <div className='flex flex-wrap gap-5'>{items}</div>
    </div>
  );
}
