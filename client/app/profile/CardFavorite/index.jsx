"use client";
import Remove from "@/components/icon/remove";
import Loading from "@/components/Loading";
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
      dispatch(login({ user: data?.data?.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {image ? (
        <div className='flex relative flex-col h-72 w-60 justify-center gap-5 items-center bg-bg-100 px-6 py-5 rounded-lg'>
          <Link
            href={`/digital-product-page/product-details/${id}/${name
              ?.replaceAll(" ", "-")
              ?.toLowerCase()}`}>
            <Tilt perspective={4000} glareMaxOpacity={1} scale={1}>
              <div className='h-[200px] w-[170px] '>
                <img
                  src={process.env.NEXT_PUBLIC_DB_HOST + image}
                  alt='product-image'
                  srcSet=''
                  className='w-[100%] h-[100%] rounded'
                />
              </div>
            </Tilt>
          </Link>
          {/* </Link> */}
          <div>
            {" "}
            <div className='font-bold'>{name?.slice(0, 20)}</div>
            <div className='text-my-yellow'>${price}</div>
          </div>
          <button
            className='absolute top-[3%] right-[2%] font-bold text-my-yellow'
            onClick={(e) => {
              e.stopPropagation(); // Prevents the click event from bubbling up to the Link
              handleClick();
            }}>
            <Remove />
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
