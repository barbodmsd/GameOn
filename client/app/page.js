"use client";

import React, { useEffect, useState } from "react";
import fetchData from "@/Utils/FetchData";
import PhysicalProductCard from "@/components/PhysicalProductCard";
import DigitalProductCard from "@/components/DigitalProductCard";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [imageSlider, setImageSlider] = useState([]); // Initialize as empty array
  const [productsCard, setProductsCard] = useState([]); // Initialize as empty array
  const [activBtn, setActiveBtn] = useState("All");
  const [value, setValue] = useState("top");
  const [products, setProducts] = useState([]); // Initialize as empty array
  const url = process.env.NEXT_PUBLIC_DB_HOST
  console.log(url)
  // Fetch sliders data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("sliders");
        setImageSlider(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Fetch initial products data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("products");
        setProductsCard(res.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Fetch products based on the selected filter
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:7000/products?filters[categoryId]=669a3d6dba3182635e174811&filters[${value}]=false`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value]);

  // Create DigitalProductCard components
  const items = products.map((e, index) => (
    <DigitalProductCard
      id={e._id}
      key={index}
      platform={e.platform}
      title={e.title}
      img={process.env.NEXT_PUBLIC_DB_HOST + e.images[0]}
      price={e.price}
    />
  ));

  // Filter and map products to Card components
  const createCards = (product, index) => (
    <PhysicalProductCard
      id={product._id}
      key={index}
      title={product.title}
      brand={product.brand}
      price={product.price}
      image={process.env.NEXT_PUBLIC_DB_HOST + product.images[1]}
    />
  );

  const filterProducts = (condition) =>
    productsCard.filter(condition).map(createCards);

  const top = filterProducts((e) => e.top === true);
  const popular = filterProducts((e) => e.popular === true);
  const mostSold = filterProducts((e) => e.mostSold === true);
  const cardStyle = filterProducts((e) => true);

  // Create SwiperSlide components
  const sliders = imageSlider.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        className="w-full h-96 rounded-lg"
        src={process.env.NEXT_PUBLIC_DB_HOST + e.image}
      />
    </SwiperSlide>
  ));

  return (
    <div className="px-8 mt-5">
      <div className="w-[1229px]">
        <Swiper className="w-full h-96" loop>
          {sliders}
        </Swiper>
      </div>
      <div>
        <div>
          <div className="flex mt-10 gap-20">
            {/* Title */}
            <div>
              <h5 className="font-bold text-xl">Our Games</h5>
            </div>
            {/* Filter buttons */}
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => setActiveBtn("All")}
                className={activBtn === "All" ? "btn-focus" : "btn-notFocus"}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveBtn("Top")}
                className={activBtn === "Top" ? "btn-focus" : "btn-notFocus"}
              >
                Top
              </button>
              <button
                type="button"
                onClick={() => setActiveBtn("Popular")}
                className={activBtn === "Popular" ? "btn-focus" : "btn-notFocus"}
              >
                Popular
              </button>
              <button
                type="button"
                onClick={() => setActiveBtn("MostSold")}
                className={activBtn === "MostSold" ? "btn-focus" : "btn-notFocus"}
              >
                Most Sold
              </button>
            </div>
          </div>
          <div className="mt-16 mb-16 flex flex-wrap justify-center gap-16 w-full">
            {activBtn === "Top"
              ? top
              : activBtn === "Popular"
              ? popular
              : activBtn === "MostSold"
              ? mostSold
              : activBtn === "All"
              ? cardStyle
              : null}
            <div className="h-40"></div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex pl-7 pb-7 mt-12 gap-10 flex-wrap w-full">
        {/* Section Title */}
        <div className="flex gap-6">
          <h4 className="text-2xl font-bold mr-3">Our Games</h4>
          <button
            onClick={() => setValue("top")}
            className={value === "top" ? "btn-focus" : "btn-notFocus"}
          >
            Top
          </button>
          <button
            onClick={() => setValue("popular")}
            className={value === "popular" ? "btn-focus" : "btn-notFocus"}
          >
            Popular
          </button>
          <button
            onClick={() => setValue("mostSold")}
            className={value === "mostSold" ? "btn-focus" : "btn-notFocus"}
          >
            Most Sold
          </button>
        </div>
        {/* Products List */}
        <div className="flex flex-wrap gap-16 justify-center">{items}</div>
      </div>
      <div className=" flex justify-center py-16">
        <img src="botonBaner.png"/>
      </div>
    </div>
  );
}
