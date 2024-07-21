import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

// get data
const getData = async () => {
  try {
    const res = await fetch(
      "http://localhost:7000/products?filters[categoryId]=669a3d6dba3182635e174811&page=1&limit=5"
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
// create card in best games section
export const BestGameCard = ({ img, title, platform, id, price }) => {
  return (
    <Link
      href={`/games/product-details/${id}/${title
        .replaceAll(" ", "-")
        .toLowerCase()}`}>
      <div className=' duration-300 hover:bg-my-yellow hover:-translate-x-5 w-[100%] items-center h-16 rounded-md flex justify-between  '>
        <div className='flex items-center gap-3 w-[60%] h-[100%]'>
          <img
            src={img}
            alt={title}
            className=' object-cover w-[50%] h-[100%] rounded-md'
          />
          <div className='flex flex-col gap-1'>
            <h2 className=' font-bold text-white text-sm'>
              {title.slice(0, 4)}
            </h2>
            <h6 className='text-txt font-bold text-xs'>
              {platform.slice(0, 4)}
            </h6>
          </div>
        </div>
        <p className='text-black text-sm mr-2 font-bold '>${price}</p>
        <span className='text-txt px-2 rounded-full bg-bg-300'>
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
};
export default async function BestGames() {
  const products = await getData();

  // import data into card
  const items = products?.map((e, index) => (
    <BestGameCard
      key={index}
      price={e.price}
      id={e._id}
      img={"http://localhost:7000/" + e.images[1]}
      title={e.title}
      platform={e.platform}
    />
  ));
  return (
    <section className='flex flex-col p-2 py-5 gap-6 w-[200px] h-[500px] rounded-l-2xl bg-black'>
      <span className='flex gap-4'>
        <h5 className='font-bold'>Best Game</h5>
        <span className='px-2 font-bold rounded-full text-black bg-my-yellow'>
          20
        </span>
      </span>
      {items}
    </section>
  );
}
