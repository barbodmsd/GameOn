"use client";
import React, { useEffect, useState } from "react";
import PdCard from "./PdCard";
import Slider from "./slider";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";

export default function GameProductDetails({ params }) {
  const [products, setProducts] = useState();
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );
  const id = params.slugs[0];
  const { quantity } = user.cart.filter((e) => e._id == id)[0];

  console.log({ quantity });
  const addToCart = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/add-cart`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: id,
            quantity: 1,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = async () => {};
  // const addToCart = async () => {};

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_DB_HOST + `products/${id}`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  return (
    <>
      {products ? (
        <div className='min-h-screen w-full px-8 mt-5 '>
          <PdCard
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            product={products}
          />
          <Slider />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
