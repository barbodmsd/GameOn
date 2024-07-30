'use client'
import PasswordIcon from "@/components/icon/password";
import UserIcon from "@/components/icon/user";
import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";
import {motion} from 'framer-motion'
export default function Login({handlePageType}) {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <motion.div  initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className='w-full h-full flex justify-evenly p-10 '>
      {/* form */}
      <div className='w-[350px] h-[400px] p-2 px-5 pt-10 rounded-xl flex flex-col items-center gap-2 bg-bg-100'>
        <h5 className='font-bold text-xl' style={{ letterSpacing: "2px" }}>
          LOGIN
        </h5>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='flex w-full items-center p-1 flex-col gap-4'>
          {/* username */}
          <div className=' w-full flex flex-col gap-2 text-left'>
            <label className='' htmlFor='username'>
              Username
            </label>
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
          <button className=' bg-my-yellow py-2 px-16 text-black font-bold rounded-xl outline-none border-none'>
            Login
          </button>
        </form>
        {/* forget password */}
        <div className='text-left flex flex-col gap-1  w-full mt-6'>
          <h6 className='text-xs text-my-yellow hover:underline cursor-pointer'>
            Forget Password?
          </h6>
          <h6 className='text-xs text-my-yellow hover:underline cursor-pointer' onClick={handlePageType}>
            Are you don't have an account? Register
          </h6>
        </div>
      </div>
      {/* image */}
      <div className='w-[50%] '></div>
      <DevTool control={control} />
    </motion.div>
  );
}
