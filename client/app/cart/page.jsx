"use client";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CardCart = ({img,title,brand,price}) => {
  return (
    <>
      <div className='w-[700px] h-[80px] rounded-lg bg-bg-300 flex gap-5 items-center'>
        {/* image */}
        <div className='w-[50px] h-[50px]'>
          <img src={img} alt={title} className='w-full h-full' />
        </div>
        {/* title */}
        <h2 className='font-bold text-lg '>title</h2>
        {/* brand */}
        <h2 className="'font-bold text-md ">brand</h2>
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
      </div>
    </>
  );
};
export default function Cart() {
  const [value, setValue] = useState(true);
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );
  const dispatch = useDispatch();

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
      dispatch(login({ user: data.data.user, token }));
      setValue(!value);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromCart = async () => {
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
      setValue(!value);
    } catch (error) {
      console.log(error);
    }
  };

  const quantity=useMemo(() => {
    if(user.cart){
      return user?.cart?.filter((e) => e.productId._id == id)[0]?.quantity
    }
  }, [value]);

  return (
    <div className='min-h-screen w-full pl-[50px] flex flex-col gap-10 mt-5 '>
      <h2 className='text-2xl font-bold'>Cart</h2>
      <div className='w-full h-full flex flex-col pt-5 pl-5 '>
        <CardCart />
      </div>
    </div>
  );
}
