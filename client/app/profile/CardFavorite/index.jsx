"use client";
import Remove from "@/components/icon/remove";
import { login } from "@/Store/Slices/authSlice";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { useDispatch, useSelector } from "react-redux";

export default function CardFavorite({ name, id, price, image }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );

  const handleClick = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/favorites`,
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
      dispatch(login({ user: data.data.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <Tilt perspective={4000} glareMaxOpacity={1} scale={1}>
      <div className='flex relative flex-col h-72 w-60 justify-center gap-5 items-center bg-bg-100 px-6 py-5 rounded-lg'>
        <img
          src={process.env.NEXT_PUBLIC_DB_HOST + image}
          alt='product-image'
          srcset=''
          className='w-[90%] h-[70%] rounded'
        />

        {/* </Link> */}
        <span className='font-bold'>{name.slice(0,20)}</span>
        <span className='text-my-yellow'>${price}</span>
        <button
          className='absolute top-[3%] right-[2%] font-bold text-my-yellow'
          onClick={handleClick}>
          <Remove />
        </button>
      </div>
    // </Tilt>
  );
}
