'use client'
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Profile() {
  const { token,user } = useSelector((state) => state?.persistedReducer?.authSlice);
  const router=useRouter()
  if (!token) {
    router.push("/auth");
  }
  return (
    <div className="min-h-screen px-8 mt-5 ">
      Profile
    </div>
  );
}
