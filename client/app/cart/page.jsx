"use client";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";
import { login } from "@/Store/Slices/authSlice";
export const CardCart = ({
  img,
  id,
  title,
  price,
  addToCart,
  removeFromCart,
  constraintsRef,
  quantity,
}) => {
  return (
    <>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className='w-[700px] cursor-pointer px-2 h-[80px] rounded-lg bg-bg-300 flex gap-5 items-center justify-between'>
        <Link
          href={`/digital-product-page/product-details/${id}/${title
            .replaceAll(" ", "-")
            .toLowerCase()}`}>
          {/* image */}
          <div className='w-[100px] h-[70px]'>
            <img
              src={img}
              alt={title}
              className='w-full h-full object-fill rounded'
            />
          </div>
        </Link>

        {/* title */}
        <h2 className='font-bold text-lg '>{title}</h2>
        {/* brand */}
        <h2 className="'font-bold text-md text-my-yellow">${price}</h2>
        {/* button */}
        <div className='flex gap-2 items-center'>
          {quantity && (
            <motion.div
              initial={{
                rotate: "0deg",
                scale: 0,
                y: 0,
              }}
              animate={{
                rotate: "360deg",
                scale: 1,
                y: [0, 100, -100, -100, 0], //keyframe
              }}
              exit={{
                rotate: "0deg",
                scale: 0,
                y: 0,
                // when you use exit props should be in AnimatePresence cmp
              }}
              transition={{
                duration: 1,
                times: [0, 0.25, 0.5, 0.85, 1], //keyframe
                ease: "backInOut",
              }}>
              <button
                disabled={!quantity}
                className='rounded-full px-3 p-1 border border-my-yellow text-my-yellow'
                onClick={removeFromCart}>
                -
              </button>
            </motion.div>
          )}
          {quantity && <p className='font-bold '>{quantity}</p>}
          <button
            className='rounded-full px-3 p-1 border border-my-yellow text-my-yellow'
            onClick={addToCart}>
            +
          </button>
        </div>
      </motion.div>
    </>
  );
};
export default function Cart() {
  const constraintsRef = useRef(null);
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );
  const dispatch = useDispatch();

  const addToCart = async (id) => {
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
      dispatch(login({ user: data.data.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = async (id) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/remove-cart`,
        {
          method: "DELETE",
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
      dispatch(login({ user: data.data.user, token }));
    } catch (error) {
      console.log(error);
    }
  };

  let totalPrice = 0;
  const items = user.cart?.map((e, index) => {
    totalPrice += e.productId.price * e.quantity;
    return (
      <CardCart
        key={index}
        constraintsRef={constraintsRef}
        id={e.productId._id}
        addToCart={() => addToCart(e.productId._id)}
        removeFromCart={() => removeFromCart(e.productId._id)}
        title={e.productId.title}
        img={process.env.NEXT_PUBLIC_DB_HOST + e.productId.images[0]}
        price={e.productId.price * e.quantity}
        quantity={e.quantity}
      />
    );
  });
  console.log(totalPrice);
  return (
    <div className='min-h-screen w-full pl-[50px] flex flex-col gap-10 mt-5 '>
      <h2 className='text-2xl font-bold'>Cart</h2>
      <motion.div
        ref={constraintsRef}
        className='w-full h-full flex flex-col p-5 gap-5'>
        {items}
      </motion.div>
    </div>
  );
}
