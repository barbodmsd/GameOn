"use client";
import fetchData from "@/Utils/FetchData";
import { useEffect, useState } from "react";
import Card from "../Card";


export default function Home() {
  const [productsCard, setProductsCard] = useState();
  const [activBtn, setActiveBtn] = useState("All");
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

  const createCard = (product, index) => (
    <Card
      id={product._id}
      key={index}
      title={product.title}
      brand={product.brand}
      price={product.price}
      image={"http://localhost:7000/" + product.images[1]}
    />
  );

  const filterProducts = (condition) =>
    productsCard?.filter(condition).map(createCard);
  const top = filterProducts((e) => e.top === true);
  const popular = filterProducts((e) => e.popular === true);
  const mostSuled = filterProducts((e) => e.mostSuled === true);
  const cardDtyle = filterProducts((e) => e);
  return (
    <div>
      <div className="flex mt-10 gap-20">
        {/* text */}
        <div>
          <h5 className="font-bold text-xl">Our Games</h5>
        </div>
        {/* buttons */}
        <div className="flex gap-5">
          <button
            type="button"
            onClick={() => setActiveBtn("All")}
            className={activBtn == "All" ? "btn-focus" : "btn-notFocus"}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveBtn("Top")}
            className={activBtn == "Top" ? "btn-focus" : "btn-notFocus"}
          >
            Top
          </button>
          <button
            type="button"
            onClick={() => setActiveBtn("Popular")}
            className={activBtn == "Popular" ? "btn-focus" : "btn-notFocus"}
          >
            Popular
          </button>
          <button
            type="button"
            onClick={() => setActiveBtn("MostSold")}
            className={activBtn == "MostSold" ? "btn-focus" : "btn-notFocus"}
          >
            Most Sold
          </button>
        </div>
      </div>
      <div className=" mt-16 mb-16 flex flex-wrap gap-20 ">
        {activBtn === "Top"
          ? top
          : activBtn === "Popular"
          ? popular
          : activBtn === "MostSold"
          ? mostSuled
          : activBtn === "All"
          ? cardDtyle
          : ""}
        <div className="h-40"></div>
      </div>
    </div>
  );
}