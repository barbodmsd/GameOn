"use client";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import AuthLayout from "./layout";

export default function Auth() {
  const [pageType, setPageType] = useState('login');
  const handlePageType = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };
  return (
    <AuthLayout>
          <div className='min-h-screen flex w-full justify-center px-8 mt-5 '>
      {pageType === "login" ? (
        <Login handlePageType={handlePageType} />
      ) : (
        <Register handlePageType={handlePageType} />
      )}
    </div>
    </AuthLayout>

  );
}

// 6104 3376 3571 0278
// hosein moradi mellat
// one milion
