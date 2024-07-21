import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

const getData = async () => {
  try {
    const res = await fetch(
      "http://localhost:7000/products"
    );
    const data = await res.json();
    return data.data.slice(4,10);
  } catch (error) {
    console.log(error);
  }
};
export const BestGameCard = ({img,title,platform,id}) => {
  return (
    <Link href={ `/games/product-details/${id}/${title.replaceAll(" ", "-").toLowerCase()}`}>
    <div className='w-[100%] items-center h-16 rounded-md flex justify-between pl-1 '>
      <div className='flex items-center gap-3 w-[60%] h-[100%]'>
        <img src={img} alt={title} className=' object-cover w-[50%] h-[100%] rounded-md' />
        <div className='flex flex-col gap-1'>
          <h2 className='font-bold text-white text-sm'>{title.slice(0,4)}</h2>
          <h6 className='text-txt text-xs'>{platform.slice(0,4)}</h6>
        </div>
      </div>
      <span className="text-txt px-2 rounded-full bg-bg-300"><ArrowIcon/></span>
    </div>
    </Link>
  );
};
export default async function BestGames() {
  const products = await getData();
  const items = products?.map((e, index) => (
    <BestGameCard
      key={index}
      id={e._id}
      img={"http://localhost:7000/" + e.images[1]}
      title={e.title}
      platform={e.platform}
    />
  ));
  return (
    <div className='flex flex-col p-2 py-5 gap-4 w-[200px] h-[500px] rounded-l-2xl bg-black'>
      <span className="flex gap-4">
        <h5 className='font-bold'>Best Game</h5>
        <span className="px-2 font-bold rounded-full text-black bg-my-yellow">20</span>
      </span>
      {items}
      
    </div>
  );
}
