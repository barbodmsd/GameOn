"use client";
import PasswordIcon from "@/components/icon/password";
import PhoneIcon from "@/components/icon/phone";
import UserIcon from "@/components/icon/user";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

export default function Register({ handlePageType }) {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className='w-full h-full flex justify-evenly p-10 '>
      {/* image */}
      <div className='w-[50%] '></div>
      {/* form */}
      <div className='w-[350px] min-h-[500px] p-2 pb-3 px-5 pt-10 rounded-xl flex flex-col items-center gap-2 bg-bg-100'>
        <h5 className='font-bold text-xl' style={{ letterSpacing: "2px" }}>
          REGISTER
        </h5>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='flex w-full items-center p-1 flex-col gap-4'>
          {/* username */}
          <div className=' w-full flex flex-col gap-2 text-left'>
            <label htmlFor='username'>Username</label>
            <div className='w-full relative'>
              <input
                className='w-full pl-8 py-2 px-4 rounded-xl bg-bg-200 outline-none'
                type='text'
                id='username'
                placeholder='Username'
                {...register("username", {
                  required: "username is required",
                })}
              />
              <span className='absolute left-[3%] top-[50%] translate-y-[-50%] text-txt  '>
                <UserIcon />
              </span>
            </div>
            <p className='text-sm text-red-500 text-left'>
              {errors.username?.message}
            </p>
          </div>
          {/* password */}
          <div className=' w-full flex flex-col gap-2 text-left'>
            <label className='' htmlFor='password'>
              Password
            </label>
            <div className='w-full relative'>
              <input
                className='w-full pl-8 py-2 px-4 rounded-xl bg-bg-200 outline-none'
                type='password'
                id='password'
                placeholder='Password'
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password must be at latest 6 character",
                  },
                })}
              />
              <span className='absolute left-[3%] top-[50%] translate-y-[-50%] text-txt  text-xs'>
                <PasswordIcon className='text-xs' />
              </span>
            </div>
            <p className='text-sm text-red-500 text-left'>
              {errors.password?.message}
            </p>
          </div>
          {/* phone number */}
          <div className=' w-full flex flex-col gap-2 text-left'>
            <label className='' htmlFor='phone'>
              Phone Number
            </label>
            <div className='w-full relative'>
              <input
                className='w-full pl-8 py-2 px-4 rounded-xl bg-bg-200 outline-none'
                type='text'
                id='phone'
                placeholder='Phone Number'
                {...register("phone", {
                  required: "phone is required",
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
                    message: "invalid phone format",
                  },
                })}
              />
              <span className='absolute left-[3%] top-[50%] translate-y-[-50%] text-txt  text-xs'>
                <PhoneIcon />
              </span>
            </div>
            <p className='text-sm text-red-500 text-left'>
              {errors.phone?.message}
            </p>
          </div>
          <button className=' bg-my-yellow py-2 px-16 text-black font-bold rounded-xl outline-none border-none'>
            Register
          </button>
        </form>
        {/* forget password */}
        <div className='text-left flex flex-col gap-1  w-full mt-3'>
          <h6
            className='text-xs text-my-yellow hover:underline cursor-pointer'
            onClick={handlePageType}>
            Already have an account? Login
          </h6>
        </div>
      </div>
      <DevTool control={control} />
    </div>
  );
}