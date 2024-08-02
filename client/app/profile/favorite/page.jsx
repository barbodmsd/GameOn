"use client"
import React, { useState } from "react";
import CardPurchases from "../CardPurchases";
import CardFavorite from "../CardFavorite";

export default function page() {
    const [cardPrice ,setCardPrice] = useState(0)
    const handelPriceCard = (vlaue)=>{
        if(cardPrice>0){
            setCardPrice(0)
        }
        setCardPrice(vlaue)
    }
  return (
    <div className="mx-10">
      <div className="mt-5">
        {/* title page */}
        <span className="text-txt font-bold text-lg">user name</span>
        <h1 className="text-my-yellow font-bold text-2xl">Good Day</h1>
      </div>
      <div className=" flex flex-wrap gap-5 bg-bg-300 w-full h-full my-8 p-5 rounded-3xl">
        <CardFavorite/>
        <CardFavorite/>
        <CardFavorite/>
        <CardFavorite/>
        <CardFavorite/>
        <CardFavorite/>
        <CardFavorite/>
        <CardFavorite/>
      </div>
    </div>
  );
}
