import Banner from "@/components/Banner";
import BestGames from "@/components/BestGames";
import React from "react";

export default function Games() {
  return < >
  <div className='h-screen px-8 mt-5 flex justify-between gap-3'>
    {/* main */}
    <div className='w-full min-h-[300px]'>
    <Banner/>
    </div>
    <div>
        <BestGames/>
    </div>
   

  </div>
  </>;
}





















// meta data for CEO
export const generateMetadata=()=>{
    return {
        title:'Games'
    }
}