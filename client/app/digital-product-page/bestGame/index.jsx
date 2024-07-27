import Link from "next/link";
import "./style.css";
import React from "react";

// &bestGame=true&page=1&limit=5
const getData = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_DB_HOST +
        "products?key=digital"
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
const CardBest = ({ id, title, brand, image, price }) => {
  return (
    <Link
      href={`/digital-product-page/product-details/${id}/${title
        .replaceAll(" ", "-")
        .toLowerCase()}`}>
      <div className='w-[100%] mt-4'>
        <div className='card-best  flex items-center justify-between  hover:text-black w-[100%]  rounded-l-lg  hover:-translate-x-14 transition-all duration-300 h-14'>
          {/* BestGames card details */}
          <div className='flex gap-5 items-center'>
            {/* image card */}
            <div className='card-best-imag rounded-xl ml-3'>
              <img
                src={image}
                alt='test'
                className='w-full h-12 object-cover  '
              />
            </div>
            {/* title card */}
            <div className=''>
              <p className=' text-sm'>{title.slice(0,20)}</p>
              <p className=' text-xs text-txt'>{brand}</p>
            </div>
          </div>
          {/* BestGames card praice */}
          <div className='card-best-praice  hidden'>
            <p>${price}</p>
          </div>
          {/* BestGames card icon */}
          <div className=' bg-[#28282A] w-10 h-5 rounded-l-xl flex justify-center items-center'>
            <button type='button' className='btn-icon-left'>
              {" "}
              <svg
                className=' size-4'
                viewBox='0 0 9 7'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 2.51639V3.59708H2.06844L3.82079 5.34942L3.0562 6.11347L0 3.05674L3.0562 0L3.82079 0.764049L2.06844 2.51639H9Z'
                  fill='#7D8085'
                />
              </svg>
            </button>
            <button type='button' className='btn-icon-cart hidden'>
              {" "}
              <svg
                className=' size-4'
                viewBox='0 0 7 9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6.5625 2.1875H5.25V1.75C5.25 1.28587 5.06563 0.840752 4.73744 0.512563C4.40925 0.184375 3.96413 0 3.5 0C3.03587 0 2.59075 0.184375 2.26256 0.512563C1.93437 0.840752 1.75 1.28587 1.75 1.75V2.1875H0.4375C0.321468 2.1875 0.210188 2.23359 0.128141 2.31564C0.0460937 2.39769 0 2.50897 0 2.625V7.4375C0 7.7856 0.138281 8.11944 0.384422 8.36558C0.630564 8.61172 0.964403 8.75 1.3125 8.75H5.6875C6.0356 8.75 6.36944 8.61172 6.61558 8.36558C6.86172 8.11944 7 7.7856 7 7.4375V2.625C7 2.50897 6.95391 2.39769 6.87186 2.31564C6.78981 2.23359 6.67853 2.1875 6.5625 2.1875ZM2.625 1.75C2.625 1.51794 2.71719 1.29538 2.88128 1.13128C3.04538 0.967187 3.26794 0.875 3.5 0.875C3.73206 0.875 3.95462 0.967187 4.11872 1.13128C4.28281 1.29538 4.375 1.51794 4.375 1.75V2.1875H2.625V1.75ZM6.125 7.4375C6.125 7.55353 6.07891 7.66481 5.99686 7.74686C5.91481 7.82891 5.80353 7.875 5.6875 7.875H1.3125C1.19647 7.875 1.08519 7.82891 1.00314 7.74686C0.921094 7.66481 0.875 7.55353 0.875 7.4375V3.0625H1.75V3.5C1.75 3.61603 1.79609 3.72731 1.87814 3.80936C1.96019 3.89141 2.07147 3.9375 2.1875 3.9375C2.30353 3.9375 2.41481 3.89141 2.49686 3.80936C2.57891 3.72731 2.625 3.61603 2.625 3.5V3.0625H4.375V3.5C4.375 3.61603 4.42109 3.72731 4.50314 3.80936C4.58519 3.89141 4.69647 3.9375 4.8125 3.9375C4.92853 3.9375 5.03981 3.89141 5.12186 3.80936C5.20391 3.72731 5.25 3.61603 5.25 3.5V3.0625H6.125V7.4375Z'
                  fill='#BDFD00'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default async function BestGame() {
  const bestGames = await getData();
  const items = bestGames?.map((e, index) => (
    <CardBest
      key={index}
      title={e?.title}
      brand={e?.brand}
      price={e?.price}
      id={e?._id}
      image={process.env.NEXT_PUBLIC_DB_HOST + e?.images[0]}
    />
  ));
  return <>{items}</>;
}
