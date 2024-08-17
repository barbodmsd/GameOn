"use client";
import { login } from "@/Store/Slices/authSlice";
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
      const data=await res.json()
      dispatch(login({ user: data.data.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tilt
      perspective={4000}
      // tiltMaxAngleX={10}
      // tiltMaxAngleY={10}
      glareMaxOpacity={1}
      scale={1}>
      <div className='flex flex-col h-72 w-60 justify-center gap-5 items-center bg-bg-100 px-10 py-5 rounded-lg'>
        <img
          src={process.env.NEXT_PUBLIC_DB_HOST + image}
          alt='product-image'
          srcset=''
          className='w-28'
        />
        <span className='font-bold'>{name}</span>
        <span className='text-my-yellow'>${price}</span>
      </div>
    </Tilt>
  );
}
