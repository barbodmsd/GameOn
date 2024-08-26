import React from "react";
import PageCard from "./PageCard";
import Loading from "@/components/Loading";

export const getData = async (id) => {
  try {
    const res = await fetch(`http://localhost:7000/products/${id}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ProductDetails({ params }) {
  const id = params.slugs[0];
  const product = await getData(id);

  return (
    <>
      {product ? (
        <div>
          <PageCard product={product} id={id} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
