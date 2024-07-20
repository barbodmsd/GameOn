"use client";

import { useEffect, useState } from "react";
import CDCard from "../CDCard";

export default function Products() {
  const [value, setValue] = useState("Top");
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:7000/products");
        const data = await res.json();
        setProducts(data.data.slice(4,10));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const items = products?.map((e, index) => (
    <CDCard
    id={e._id}
      key={index}
      platform={e.platform}
      title={e.title}
      img={"http://localhost:7000/" + e.images[1]}
      price={e.price}
    />
  ));
  return <div className='flex gap-3 flex-wrap w-[100%]'>{items}</div>;
}
