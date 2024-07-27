import ProductsList from "./ProductsList";
import GameBanner from "./banner";
import BestGame from "./bestGame";

export default function DigitalProductPage() {
  return <>
  <div className='min-h-screen px-8 mt-5 flex justify-between gap-3'>
    {/* main */}
    <div className='w-full min-h-[300px]'>
    <GameBanner/>
    {/* all the result cards */}
    <ProductsList/>
    </div>
    {/* aside */}
    <div className="w-[280px] h-[530px] bg-black rounded-l-2xl">
          <div className="px-5 py-5 flex gap-5">
            <p>Best Game</p>
            <div className=" bg-[#BDFD00] w-7 h-5 rounded-2xl text-black flex justify-center items-center font-bold text-sm">
              10
            </div>
          </div>
          <BestGame/>
        </div>
  </div>
  </>;
}





















