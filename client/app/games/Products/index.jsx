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
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const items = products?.map((e, index) => (
    <CDCard key={index} title={e.title} img={process.env.API_URL + e.images[1]} price={e.price} />
  ));
  return <div className='flex flex-wrap w-[100%]'>{
    items
  }</div>;
}
