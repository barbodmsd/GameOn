"use client";
import React, { useEffect, useState } from "react";
import CardPurchases from "../CardPurchases";
import { useSelector } from "react-redux";
import fetchData from "@/Utils/FetchData";

export default function page() {
  const {user,token} = useSelector((state)=>state.persistedReducer.authSlice)
  const [userBalance,setUserBalance]=useState()
  console.log(userBalance?.user)
  useEffect(()=>{
    (async()=>{
      const resUser = await fetchData(`users/${user._id}`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserBalance(resUser.data)
    })()
  },[])
  const [cardPrice, setCardPrice] = useState(0);
  const handelPriceCard = (vlaue) => {
    if (cardPrice > 0) {
      setCardPrice(0);
    }
    setCardPrice(vlaue);
  };
  // const handelAddPrice = ()=>{
  //   setPriceUser(cardPrice)
  // }
  return (
    <div className="mx-10">
      <div className="mt-5">
        {/* title page */}
        <span className="text-txt font-bold text-lg">{user.username}</span>
        <h1 className="text-my-yellow font-bold text-2xl">Good Day</h1>
      </div>
      <div className=" main flex flex-col gap-5 bg-bg-300 w-full h-full my-8 p-5 rounded-3xl">
        <div className="flex w-full gap-5">
          <div className=" bg-bg-100 w-[50%] h-full p-5 flex flex-col gap-32 rounded-2xl ">
            <div className="flex justify-between">
              <div>
                <span className="text-3xl font-bold ">$ {userBalance?.user?.wallet?.balance}</span>
                <div className="flex gap-10">
                  <span className="text-green-800 text-lg">$ 20 +</span>
                  <span className="text-red-800 text-lg">$ 5 -</span>
                </div>
              </div>
              <div>
                <span className="text-lg">$</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className=" border-my-yellow border rounded-lg p-2">
                <span>$ {cardPrice}</span>
              </div>
              <button
                type="button"
                className="bg-my-yellow px-10 rounded-md text-bg-100 font-bold"
                // onClick={()=>handelAddPrice()}
              >
                Add Wallet
              </button>
            </div>
          </div>
          <div className="w-[50%] h-full flex flex-wrap gap-5 justify-center">
            <button
              type="button"
              onClick={() => handelPriceCard(50)}
              className="w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow"
            >
              $ 50
            </button>
            <button
              type="button"
              onClick={() => handelPriceCard(100)}
              className="w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow"
            >
              $ 100
            </button>
            <button
              type="button"
              onClick={() => handelPriceCard(150)}
              className="w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow"
            >
              $ 150
            </button>
            <button
              type="button"
              onClick={() => handelPriceCard(200)}
              className="w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow"
            >
              $ 200
            </button>
          </div>
        </div>
        <div>
          <div className=" w-full bg-bg-100 p-5 rounded-lg">
            <h3>purchases</h3>
            <div className="w-full flex flex-col gap-5 py-5">
              <span className="text-center text-bg-300 font-bold text-lg"> no purchases</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
