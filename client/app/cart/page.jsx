"use client";
import { login } from "@/Store/Slices/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LottieAnimation from "./Lottie";
import { useRouter } from "next/navigation";
import Remove from "@/components/icon/remove";
import { fetchData } from "@/Utils/fetchhData";
import Loading from "@/components/Loading";

export const CardCart = ({
  img,
  id,
  pathname,
  title,
  removeProductFromCart,
  price,
  addToCart,
  removeFromCart,
  constraintsRef,
  quantity,
}) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        drag
        key={pathname}
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3, type: "spring" }}
        exit={{ x: 150, opacity: 0 }}
        dragConstraints={constraintsRef}
        className='w-[700px] relative cursor-pointer px-2 h-[80px] rounded-lg bg-bg-300 flex gap-5 items-center justify-between'>
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
        <h2 className="'font-bold text-md text-my-yellow">
          ${price.toFixed(2)}
        </h2>
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
        <button
          onClick={removeProductFromCart}
          className='absolute top-[50%] translate-y-[-50%] left-[102%]'>
          <Remove />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
export default function Cart() {
  const constraintsRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPayment, setIsPayment] = useState(false);
  const { user, token } = useSelector(
    (state) => state?.persistedReducer?.authSlice
  );
  if (!token) {
    router.push("/auth");
  }
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
      dispatch(login({ user: data?.data?.user, token }));
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
      dispatch(login({ user: data?.data?.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  const clearCart = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/remove-all-cart`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      dispatch(login({ user: data?.data?.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  const removeProductFromCart = async (id) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user?._id}/remove-product`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      const data = await res.json();
      dispatch(login({ user: data?.data?.user, token }));
    } catch (error) {
      console.log(error);
    }
  };

  let totalPrice = 0;
  const items = user?.cart?.map((e, index) => {
    totalPrice += e.productId.price * e.quantity;
    return (
      <CardCart
        key={index}
        constraintsRef={constraintsRef}
        id={e?.productId?._id}
        addToCart={() => addToCart(e?.productId?._id)}
        removeFromCart={() => removeFromCart(e?.productId?._id)}
        title={e?.productId?.title}
        img={process.env.NEXT_PUBLIC_DB_HOST + e?.productId?.images[0]}
        price={e?.productId?.price * e?.quantity}
        quantity={e?.quantity}
        pathname={router.pathname}
        removeProductFromCart={() => removeProductFromCart(e?.productId?._id)}
      />
    );
  });
  let tax = totalPrice.toFixed(2) / 13;
  let shipping = totalPrice.toFixed(2) / 20;

  const handleClick = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + "users/payment",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ totalPrice }),
        }
      );
      const data = await res.json();
      dispatch(login({ user: data?.data?.user, token }));
      setIsPayment(true);
      if (data.status == "success") {
        router.push("/profile/wallet");
      }
    } catch (error) {}
  };
  console.log(isPayment)
  return (
    <>
      {user?.cart?.length > 0 ? (
        <>
          {!isPayment ? (
            <div className='flex pr-12'>
              {/* cart */}
              <div className='min-h-screen w-full pl-[50px] flex flex-col gap-10 mt-5 '>
                {/* text cart and clear button */}
                <div className='flex px-3 items-center gap-[600px]'>
                  <motion.div
                    initial={{ y: 0.1, opacity: 0 }}
                    animate={{
                      y: [0, -10, 10, 0],
                      opacity: [0.1, 0.5, 0.8, 0.1],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}>
                    <h2
                      className='text-2xl font-bold'
                      style={{ letterSpacing: "2px" }}>
                      Cart
                    </h2>
                  </motion.div>
                  <div>
                    <button
                      className='btn-focus border-none opacity-45 duration-300  hover:opacity-100'
                      onClick={clearCart}>
                      Clear All
                    </button>
                  </div>
                </div>
                <motion.div
                  ref={constraintsRef}
                  className='w-full h-full flex flex-col p-5 gap-7'>
                  {items}
                </motion.div>
              </div>
              {/* payment */}
              <section className=' w-[410px] pt-[70px] h-full flex justify-center items-center'>
                <div className='w-full flex flex-col py-5 gap-5 rounded-md  bg-bg-300 '>
                  <div className='px-5'>
                    <h2 className=' text-2xl '>Order Summary</h2>
                  </div>
                  <div className='flex px-5 flex-col gap-5 my-3'>
                    <div className='flex justify-between w-full'>
                      <h2>subTotal</h2>
                      <h3 className='text-my-yellow text-sm '>
                        ${(totalPrice - tax - shipping).toFixed(2)}
                      </h3>
                    </div>
                    <div className='flex justify-between w-full'>
                      <h2>tax</h2>
                      <h3 className='text-my-yellow text-sm'>
                        ${tax.toFixed(2)}
                      </h3>
                    </div>
                    <div className='flex justify-between w-full'>
                      <h2>shipping</h2>
                      <h3 className='text-my-yellow  text-sm '>
                        ${shipping.toFixed(2)}
                      </h3>
                    </div>
                  </div>
                  <div className='flex w-full px-5 py-3 justify-between  border-t-2'>
                    <h2 className='font-bold text-xl'>Total</h2>
                    <h3 className='text-my-yellow font-bold text-xl'>
                      ${totalPrice.toFixed(2)}
                    </h3>
                  </div>
                  <div className='w-full text-center '>
                    <button
                      onClick={handleClick}
                      className='animate-pulse transition hover:animate-none bg-my-yellow py-1 px-20 rounded-md text-black font-bold'>
                      Pay now
                    </button>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <div className='w-full h-full flex flex-col  items-center'>
          <LottieAnimation />
          <motion.div
            initial={{ y: 0.1, opacity: 0 }}
            animate={{ y: [0, -10, 10, 0], opacity: [0.1, 0.5, 0.8, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}>
            <h2
              className='font-bold -translate-y-16 text-2xl '
              style={{ letterSpacing: "2px" }}>
              Your cart is empty
            </h2>
          </motion.div>
        </div>
      )}
    </>
  );
}
