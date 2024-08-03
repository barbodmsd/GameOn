"use client";
import fetchData from "@/Utils/FetchData";
import { useEffect, useState } from "react";
import PhysicalProductCard from "@/app/physical-product-page/PhysicalProductCard";
import { SwiperSlide } from "swiper/react";
import Loading from "@/components/Loading";

export default function ProductsList() {
  const [productsCard, setProductsCard] = useState();
  const [activBtn, setActiveBtn] = useState("All");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("products?key=physical");
        setProductsCard(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const createCard = (product, index) => (
    <PhysicalProductCard
      id={product._id}
      key={index}
      title={product.title}
      brand={product.brand}
      price={product.price}
      image={process.env.NEXT_PUBLIC_DB_HOST + product.images[0]}
    />
  );

  const filterProducts = (condition) =>
    productsCard?.filter(condition).map(createCard);
  const top = filterProducts((e) => e.top === true);
  const popular = filterProducts((e) => e.popular === true);
  const mostSuled = filterProducts((e) => e.mostSuled === true);
  const cardDtyle = filterProducts((e) => e);
  return (
    <>
      {productsCard ? (
        <div>
          <div className='flex mt-20 gap-20'>
            {/* text */}
            <div>
              <h5 className='font-bold text-xl'>Our Games</h5>
            </div>
            {/* buttons */}
            <div className='flex gap-5'>
              <button
                type='button'
                onClick={() => setActiveBtn("All")}
                className={activBtn == "All" ? "btn-focus" : "btn-notFocus"}>
                All
              </button>
              <button
                type='button'
                onClick={() => setActiveBtn("Top")}
                className={activBtn == "Top" ? "btn-focus" : "btn-notFocus"}>
                Top
              </button>
              <button
                type='button'
                onClick={() => setActiveBtn("Popular")}
                className={
                  activBtn == "Popular" ? "btn-focus" : "btn-notFocus"
                }>
                Popular
              </button>
              <button
                type='button'
                onClick={() => setActiveBtn("MostSold")}
                className={
                  activBtn == "MostSold" ? "btn-focus" : "btn-notFocus"
                }>
                Most Sold
              </button>
            </div>
          </div>
          <div className=' mt-10 mb-16 flex flex-wrap gap-5 '>
            {activBtn === "Top"
              ? top
              : activBtn === "Popular"
              ? popular
              : activBtn === "MostSold"
              ? mostSuled
              : activBtn === "All"
              ? cardDtyle
              : ""}
            <div className='h-40'></div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
