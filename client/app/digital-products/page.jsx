import Banner from "@/components/Banner";
import BestGames from "@/components/BestGames";
import React from "react";

export default function DigitalProducts() {
  return (
    <div className="h-screen px-8 mt-5 flex justify-between gap-5">
      <div className="w-full max-h-[300px]">
        <Banner />
      </div>
      <div>
      <BestGames />
      </div>
    </div>
  );
}
