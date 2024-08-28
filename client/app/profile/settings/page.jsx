"use client";
import UserHead from "@/components/icon/userHead";
import fetchData from "@/Utils/FetchData";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Page() {
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );
  const router=useRouter()
  if (!token) {
    router.push("/auth");
  }
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const [infoUser, setInfoUser] = useState();
  useEffect(() => {
    const fetchUserBalance = async () => {
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
    };

    if (token && user._id) {
      fetchUserBalance();
    }
  }, [token, user._id]);
  const onSubmit = async (e) => {
    try {
      const resPost = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(e),
        }
      );
      const data = await resPost.json();
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  const { errors } = formState;
  return (
    <div className="mx-10">
      {/* title page */}
      <div className="mt-5">
        <span className="text-txt font-bold text-lg">
          {infoUser?.user?.username}
        </span>

        <h1 className="text-my-yellow font-bold text-2xl">Good Day</h1>
      </div>
      <div className="main flex gap-5 bg-bg-300 w-[90%] h-full my-8 p-10 rounded-3xl">
        {/* user setting */}
        <div className="flex flex-col gap-10 w-[30%] h-full bg-bg-100 p-10 rounded-3xl">
          <div className="flex flex-col justify-center items-center gap-5">
          <div  className='inline-block h-20 w-20 rounded-full ring-2 ring-[#BDFD00] bg-white '><UserHead /></div>
            <span style={{letterSpacing:'2px'}} className='text-xl font-bold first-letter:uppercase'>{token && infoUser?.user?.username}</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            
            <span>
              Phone: <span className="text-sm">{infoUser?.user?.phone}</span>
            </span>
          </div>
          <div >
            <div className="bg-bg-300 w-full rounded p-2">
              <h5 className="p-1">Address:</h5>
              <div className="flex flex-col gap-0">
                <span className="p-5">
                  city: {infoUser?.user?.address[0]?.city}
                </span>
                <span className="p-5">
                  State: {infoUser?.user?.address[0]?.state}
                </span>
               
              </div>
            </div>
          </div>
        </div>
        {/* inputs */}
        <div className="w-[70%] flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex gap-20 pb-10">
              <div className="flex flex-col gap-10 w-[40%]">
                {/* input username */}
                <div className="flex flex-col">
                  <label htmlFor="username">UserName</label>
                  <input
                    type="text"
                    id="username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "required UserName",
                      },
                    })}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.username && (
                      <span className="text-red-900">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* input phone */}
                <div className="flex flex-col">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "required phone",
                      },
                    })}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.phone && (
                      <span className="text-red-900">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* input State/Country */}
                <div className="flex flex-col">
                  <label htmlFor="state">State/Country</label>
                  <input
                    type="text"
                    id="state"
                    {...register("address.state", {
                      required: {
                        value: true,
                        message: "required State",
                      },
                    })}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.state && (
                      <span className="text-red-900">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* input Country */}
                <div className="flex flex-col">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    {...register("address.country", {
                      required: {
                        value: true,
                        message: "required country",
                      },
                    })}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.country && (
                      <span className="text-red-900">
                        {errors.country.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-10 w-[40%]">
                {/* input email */}
                <div className="flex flex-col">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="text"
                    id="email"
                    {...register("email")}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.email && (
                      <span className="text-red-900">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* input password */}
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.password && (
                      <span className="text-red-900">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* input City */}
                <div className="flex flex-col">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    {...register("address.city", {
                      required: {
                        value: true,
                        message: "required city",
                      },
                    })}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.city && (
                      <span className="text-red-900">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* input Post Code */}
                <div className="flex flex-col">
                  <label htmlFor="post">Post code</label>
                  <input
                    type="number"
                    id="post"
                    {...register("address.post", {
                      required: {
                        value: true,
                        message: "required post",
                      },
                    })}
                    className="text-black outline-none w-60 py-1 px-2 rounded-xl"
                  />
                  <div>
                    {errors.post && (
                      <span className="text-red-900">
                        {errors.post.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="bg-my-yellow px-5 py-1 rounded-lg">
              Save
            </button>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
}
