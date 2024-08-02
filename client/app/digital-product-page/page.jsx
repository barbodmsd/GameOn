import ProductsList from "./ProductsList";
import GameBanner from "./banner";
import BestGame from "./bestGame";

export default function DigitalProductPage() {
  return <>
  <div className='min-h-screen pl-8 mt-5 pr-1 flex justify-between gap-3'>
    {/* main */}
    <div className='w-full min-h-[300px]'>
    <GameBanner/>
    {/* all the result cards */}
    <ProductsList/>
    </div>
    {/* aside */}
    <BestGame/>
  </div>
  </>;
}


export const generateMetadata=()=>{
  return {
    title:'Digital Games',
  }
}





















