"use client";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const submit = (data) => {
    console.log("submit ok", data);
  };
  const { errors } = formState;
  return (
    <div className="mx-10">
      {/* title page */}
      <div className="mt-5">
        <span className="text-txt font-bold text-lg">user name</span>
        <h1 className="text-my-yellow font-bold text-2xl">Good Day</h1>
      </div>
      <div className="main flex gap-5 bg-bg-300 w-[90%] h-full my-8 p-10 rounded-3xl">
        {/* user setting */}
        <div className="flex flex-col gap-10 w-[30%] h-full bg-bg-100 p-10 rounded-3xl">
          <div className="flex flex-col justify-center items-center gap-5">
            <img
              src="../Profile.svg"
              alt="profile-image"
              className="bg-white rounded-full w-[100px]"
            />
            <span>user name</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span>
              Email: <span>test@gmail.com</span>
            </span>
            <span>
              Phone: <span>0903429192</span>
            </span>
          </div>
          <div>
            <div className="bg-bg-300 w-full h-36">
              <h5 className="p-2">address :</h5>
              <address></address>
            </div>
          </div>
        </div>
        {/* inputs */}
        <div className="w-[70%] flex justify-center items-center">
          <form onSubmit={handleSubmit(submit)}>
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
                    className="text-black"
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
                    {...register("state", {
                      required: {
                        value: true,
                        message: "required State",
                      },
                    })}
                    className="text-black"
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
                    {...register("country", {
                      required: {
                        value: true,
                        message: "required country",
                      },
                    })}
                    className="text-black"
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
                    className="text-black"
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
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="text-black"
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
                    {...register("city", {
                      required: {
                        value: true,
                        message: "required city",
                      },
                    })}
                    className="text-black"
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
                    {...register("post", {
                      required: {
                        value: true,
                        message: "required post",
                      },
                    })}
                    className="text-black"
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
