"use client";
import React, { useEffect, useState } from "react";
import CardFavorite from "../CardFavorite";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import LottieAnimation from "./Lottie";
import { useRouter } from "next/navigation";

const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`http://localhost:7000/products/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Favorite() {
  const { user, token } = useSelector(
    (state) => state?.persistedReducer?.authSlice
  );
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const router = useRouter();
  if (!token) {
    router.push("/auth");
  }
  useEffect(() => {
    const fetchFavorites = async () => {
      const products = await Promise.all(
        user?.favorites?.map((productId) => fetchProductById(productId))
      );
      setFavoriteProducts(products.filter((product) => product !== null));
    };

    fetchFavorites();
  }, [user?.favorites]);
  const card = favoriteProducts?.map((e, index) => (
    <CardFavorite
      key={index}
      id={e?.data?._id}
      name={e?.data?.title}
      price={e?.data?.price}
      image={e?.data?.images[0]}
    />
  ));
  return (
    <>
      {favoriteProducts?.length > 0 ? (
        <div className='mx-10'>
          <div className='mt-5'>
            {/* title page */}
            <span className='text-txt font-bold text-lg'>{user.username}</span>
            <h1 className='text-my-yellow font-bold text-2xl'>Good Day</h1>
          </div>
          <div className='flex flex-wrap gap-5 bg-bg-300 w-full h-full my-8 p-5 rounded-3xl'>
            {card}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
          <LottieAnimation />
        </div>
      )}
    </>
  );
}
