"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "@/Utils/FetchData";
import { login } from "@/Store/Slices/authSlice";

export default function Page() {
  const token = useSelector((state) => state.persistedReducer.authSlice.token);
  const oldUser = useSelector((state) => state.persistedReducer.authSlice.user);
  const [user, setUser] = useState(oldUser);
  const [userBalance, setUserBalance] = useState();
  const [cardPrice, setCardPrice] = useState(0);
  const dispatch = useDispatch();
  const [count, setCount] = useState(true);
  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const resUser = await fetchData(`users/${user._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserBalance(resUser.data);
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    if (token && user._id) {
      fetchUserBalance();
    }
  }, []);

  const postUserData = async () => {
    try {
      const resPost = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wallet: {
              balance: cardPrice,
            },
          }),
        }
      );
      const data = await resPost.json();
      setUserBalance(data.data);
      dispatch(login({ user: data.data.user, token }));
      setUser(data.data.user);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };
  const handlePriceCard = (value) => {
    setCardPrice(value);
  };

  const handleAddPrice = () => {
    postUserData();
    setCount(!count);
  };

  const newWallet = user?.wallet?.balance;
  return (
    <div className='mx-10'>
      <div className='mt-5'>
        {/* title page */}
        <span className='text-txt font-bold text-lg'>{user?.username}</span>
        <h1 className='text-my-yellow font-bold text-2xl'>Good Day</h1>
      </div>
      <div className='main flex flex-col gap-5 bg-bg-300 w-full h-full my-8 p-5 rounded-3xl'>
        <div className='flex w-full gap-5'>
          <div className='bg-bg-100 w-[50%] h-full p-5 flex flex-col gap-32 rounded-2xl'>
            <div className='flex justify-between'>
              <div>
                <span className='text-3xl font-bold'>{newWallet}</span>
                <div className='flex gap-10'>
                  <span className='text-green-800 text-lg'>$ 20 +</span>
                  <span className='text-red-800 text-lg'>$ 5 -</span>
                </div>
              </div>
              <div>
                <span className='text-lg'>$</span>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='border-my-yellow border rounded-lg p-2'>
                <span>$ {cardPrice}</span>
              </div>
              <button
                type='button'
                className='bg-my-yellow px-10 rounded-md text-bg-100 font-bold'
                onClick={handleAddPrice}>
                Add Wallet
              </button>
            </div>
          </div>
          <div className='w-[50%] h-full flex flex-wrap gap-5 justify-center'>
            {[50, 100, 150, 200].map((value) => (
              <button
                key={value}
                type='button'
                onClick={() => handlePriceCard(value)}
                className='w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow'>
                $ {value}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className='w-full bg-bg-100 p-5 rounded-lg'>
            <h3>purchases</h3>
            <div className='w-full flex flex-col gap-5 py-5'>
              <span className='text-center text-bg-300 font-bold text-lg'>
                no purchases
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
