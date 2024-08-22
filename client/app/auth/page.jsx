"use client";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import HomeButton from "./Home";
import Loading from "@/components/Loading";

export default function Auth() {
  const [pageType, setPageType] = useState("register");
  const [banner, setBanner] = useState();
  const handlePageType = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + `banners`);
        const data = await res.json();
        setBanner(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {banner ? (
        <div className='min-h-screen flex w-full justify-center px-8 mt-5 '>
          {pageType === "login" ? (
            <Login banner={banner} handlePageType={handlePageType} />
          ) : (
            <Register banner={banner} handlePageType={handlePageType} />
          )}
          <HomeButton />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
