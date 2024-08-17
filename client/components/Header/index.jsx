"use client";
import fetchData from "@/Utils/FetchData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const SearchResult = ({ title, id, image }) => {
  return (
    <Link
      href={`/digital-product-page/product-details/${id}/${title
        .replaceAll(" ", "-")
        .toLowerCase()}`}>
      {" "}
      <div className='w-full h-[100px] gap-2 flex justify-between px-3  items-center '>
        <div className="w-[50%] h-full p-1"><img src={image} alt={title} width={"100%"} className="object-fill" height={"100%"} /></div>
        <h2 className='font-bold text-my-yellow text-xs'>{title.slice(0,20)}</h2>
      </div>
    </Link>
  );
};

export default function Header() {
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  const [infoUser, setInfoUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const resUser = await fetchData(`users/${user._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInfoUser(resUser.data);
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    })();
  }, []);
  const handleChange = async (e) => {
    setSearch(e.target.value);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + `search`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ search }),
      });
      const data = await res.json();
      setResult(data.data.product);
    } catch (error) {
      console.error(error);
    }
  };
  const items = result?.map((e, index) => (
    <SearchResult
      key={index}
      id={e?._id}
      title={e?.title}
      image={process.env.NEXT_PUBLIC_DB_HOST + e?.images[1]}/>
  ));
  window.addEventListener('click',(e)=>{
    if(!e.target.closest('#search')){
      setSearch('')
    }
  })
  return (
    <header className=' flex w-full h-20 items-center z-10  px-10 justify-between'>
      <div>
        <div className='relative  mt-2 rounded-md shadow-sm'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'>
            <span className='text-gray-500 sm:text-sm'>
              <svg
                width='14'
                height='13'
                viewBox='0 0 14 13'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M4.89864 9.61593C3.54537 9.61593 2.40017 9.15042 1.46306 8.2194C0.525943 7.28838 0.0571376 6.15124 0.056641 4.80797C0.0561444 3.46469 0.52495 2.32755 1.46306 1.39653C2.40116 0.46551 3.54636 0 4.89864 0C6.25093 0 7.39637 0.46551 8.33498 1.39653C9.27358 2.32755 9.74214 3.46469 9.74065 4.80797C9.74065 5.3504 9.65374 5.86202 9.47993 6.34282C9.30611 6.82361 9.07022 7.24893 8.77225 7.61878L12.9438 11.761C13.0804 11.8966 13.1487 12.0692 13.1487 12.2788C13.1487 12.4884 13.0804 12.661 12.9438 12.7966C12.8073 12.9322 12.6334 13 12.4224 13C12.2113 13 12.0375 12.9322 11.9009 12.7966L7.72936 8.65434C7.35689 8.95021 6.92856 9.18445 6.44436 9.35704C5.96016 9.52963 5.44492 9.61593 4.89864 9.61593ZM4.89864 8.13656C5.8298 8.13656 6.62141 7.81307 7.27346 7.16609C7.92552 6.51911 8.2513 5.73307 8.2508 4.80797C8.25031 3.88286 7.92453 3.09707 7.27346 2.45058C6.6224 1.8041 5.83079 1.48036 4.89864 1.47937C3.9665 1.47839 3.17514 1.80212 2.52457 2.45058C1.87401 3.09904 1.54798 3.88484 1.54649 4.80797C1.545 5.7311 1.87103 6.51714 2.52457 7.16609C3.17812 7.81504 3.96948 8.13853 4.89864 8.13656Z'
                  fill='#7D8085'
                />
              </svg>
            </span>
          </div>
          <div className='relative'>
            <input
              type='text'
              name='search'
              id='search'
              value={search}
              onChange={handleChange}
              className='searchInp bg-[#28282A] w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white  sm:text-sm sm:leading-6  outline-none '
              placeholder='Search..'
            />
            {/* ///////////////////////////////////////////////////////////////// */}
            <div
              className={`absolute w-full ${
                search ? "h-[300px]" : "h-0"
              } duration-300 rounded bg-bg-200 top-100% z-20 overflow-y-auto`}>{items}</div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <span
          className='first-letter:uppercase font-bold'
          style={{ letterSpacing: "2px" }}>
          {token && user?.username}
        </span>
        <img
          className='inline-block h-10 w-10 rounded-full ring-2 ring-[#BDFD00] bg-white'
          src='Profile.svg'
          alt='profile imge'
        />
        <div className='flex gap-5'>
          {/* cart */}
          <Link href='/cart'>
            <div className=' relative'>
              {user?.cart?.length > 0 && (
                <div className=' absolute  bg-[#BDFD00] font-bold -right-2 -bottom-2 rounded-full text-black text-center size-6 animate-pulse'>
                  {user?.cart?.length}
                </div>
              )}
              <svg
                className=' size-6'
                viewBox='0 0 17 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M15.3493 4.79167H12.454V3.83333C12.454 2.81667 12.0472 1.84165 11.3233 1.12276C10.5993 0.403868 9.61736 0 8.5935 0C7.56964 0 6.58772 0.403868 5.86374 1.12276C5.13976 1.84165 4.73303 2.81667 4.73303 3.83333V4.79167H1.83768C1.58171 4.79167 1.33623 4.89263 1.15524 5.07236C0.974241 5.25208 0.872559 5.49583 0.872559 5.75V16.2917C0.872559 17.0542 1.1776 17.7854 1.72059 18.3246C2.26357 18.8638 3.00002 19.1667 3.76791 19.1667H13.4191C14.187 19.1667 14.9234 18.8638 15.4664 18.3246C16.0094 17.7854 16.3144 17.0542 16.3144 16.2917V5.75C16.3144 5.49583 16.2128 5.25208 16.0318 5.07236C15.8508 4.89263 15.6053 4.79167 15.3493 4.79167ZM6.66327 3.83333C6.66327 3.325 6.86663 2.83749 7.22862 2.47805C7.59061 2.1186 8.08157 1.91667 8.5935 1.91667C9.10543 1.91667 9.5964 2.1186 9.95839 2.47805C10.3204 2.83749 10.5237 3.325 10.5237 3.83333V4.79167H6.66327V3.83333ZM14.3842 16.2917C14.3842 16.5458 14.2825 16.7896 14.1015 16.9693C13.9205 17.149 13.6751 17.25 13.4191 17.25H3.76791C3.51195 17.25 3.26647 17.149 3.08547 16.9693C2.90448 16.7896 2.80279 16.5458 2.80279 16.2917V6.70833H4.73303V7.66667C4.73303 7.92083 4.83471 8.16459 5.01571 8.34431C5.1967 8.52403 5.44218 8.625 5.69815 8.625C5.95411 8.625 6.19959 8.52403 6.38059 8.34431C6.56158 8.16459 6.66327 7.92083 6.66327 7.66667V6.70833H10.5237V7.66667C10.5237 7.92083 10.6254 8.16459 10.8064 8.34431C10.9874 8.52403 11.2329 8.625 11.4889 8.625C11.7448 8.625 11.9903 8.52403 12.1713 8.34431C12.3523 8.16459 12.454 7.92083 12.454 7.66667V6.70833H14.3842V16.2917Z'
                  fill='#7D8085'
                />
              </svg>
            </div>
          </Link>

          <div className=' relative'>
            <div className=' absolute w-3 h-3 bg-[#BDFD00] right-0  rounded-lg'></div>
            <svg
              className=' size-6'
              viewBox='0 0 16 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M0.478149 17.2084V15.2917H2.40839V8.58336C2.40839 7.25766 2.81052 6.07987 3.61478 5.04998C4.41905 4.02009 5.46459 3.34511 6.75142 3.02502V2.35419C6.75142 1.95488 6.89232 1.61563 7.17414 1.33644C7.45595 1.05724 7.7976 0.917328 8.19909 0.916689C8.60058 0.91605 8.94256 1.05597 9.22501 1.33644C9.50747 1.61691 9.64806 1.95616 9.64677 2.35419V3.02502C10.9336 3.34447 11.9791 4.01945 12.7834 5.04998C13.5877 6.08051 13.9898 7.2583 13.9898 8.58336V15.2917H15.92V17.2084H0.478149ZM8.19909 20.0834C7.66828 20.0834 7.21403 19.8958 6.83635 19.5208C6.45866 19.1458 6.2695 18.6944 6.26886 18.1667H10.1293C10.1293 18.6938 9.94049 19.1451 9.56281 19.5208C9.18512 19.8965 8.73055 20.084 8.19909 20.0834ZM4.33862 15.2917H12.0596V8.58336C12.0596 7.52919 11.6816 6.62676 10.9256 5.87606C10.1695 5.12537 9.26072 4.75002 8.19909 4.75002C7.13746 4.75002 6.22864 5.12537 5.47264 5.87606C4.71663 6.62676 4.33862 7.52919 4.33862 8.58336V15.2917Z'
                fill='#7D8085'
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
