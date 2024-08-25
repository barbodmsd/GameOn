"use client";
import PasswordIcon from "@/components/icon/password";
import UserIcon from "@/components/icon/user";
import { DevTool } from "@hookform/devtools";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Store/Slices/authSlice";
import { useRouter } from "next/navigation";
import Tilt from "react-parallax-tilt";
import PhoneIcon from "@/components/icon/phone";
import { toast } from "react-toastify";
export default function Login({ handlePageType, banner }) {
  const form = useForm();
  const [value, setValue] = useState();
  const [forgetPass, setForgetPass] = useState(false);
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const { token } = useSelector((state) => state.persistedReducer.authSlice);
  const router = useRouter();
  const onSubmit = async (e) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST + "auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(e),
      });
      const data = await res.json();
      dispatch(login({ user: data.data.user, token: data.data.token }));
      if (data.status == "success") {
        toast.info(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendSms = async (e) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + "auth/send-sms",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(e),
        }
      );
      const data = await res.json();
      if (data.send.success) {
        setValue(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyCode = async (e) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + "auth/verify-sms",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(e),
        }
      );
      const data = await res.json();
      if (data.status != "fail") {
        dispatch(login({ user: data.data.user, token: data.data.token }));
      } else {
        setCode(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
      {banner && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 1, y: 0 }}
          className='w-full h-full flex justify-center p-10 '>
          {/* form */}
          {forgetPass ? (
            <motion.div
              initial={{
                rotate: "0deg",
                scale: 0,
                y: 0,
              }}
              animate={{
                rotate: "360deg",
                scale: 1,
                y: [0, 200, -200, -200, 0], //keyframe
              }}
              exit={{
                rotate: "0deg",
                scale: 0,
                y: 0,
                // when you use exit props should be in AnimatePresence cmp
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.25, 0.5, 0.85, 1], //keyframe
                ease: "backInOut",
              }}
              className='w-[380px] hover:shadow-xl duration-300 hover:shadow-my-yellow/20 h-full p-2 pb-8 px-5 pt-10 rounded-xl flex flex-col items-center gap-2 bg-bg-100'>
              <h5
                className='font-bold text-xl'
                style={{ letterSpacing: "2px" }}>
                Phone
              </h5>
              <form
                onSubmit={
                  value ? handleSubmit(verifyCode) : handleSubmit(sendSms)
                }
                noValidate
                className='flex w-full items-center p-1 flex-col gap-4'>
                {/* phone number */}
                
                <div className=' w-full flex flex-col gap-2 text-left'>
                  <label className='' htmlFor='phone'>
                    Phone Number
                  </label>
                  <div className='w-full relative'>
                    <input
                      autoFocus
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
                {/* code */}
                {value && (
                  <div className=' w-full flex flex-col gap-2 text-left'>
                    <label className='' htmlFor='code'>
                      Code
                    </label>
                    <div className='w-full relative'>
                      <input
                        className='w-full pl-8 py-2 px-4 rounded-xl bg-bg-200 outline-none'
                        type='text'
                        id='code'
                        placeholder='Code'
                        {...register("code", {
                          required: "code is required",
                        })}
                      />
                      <span className='absolute left-[3%] top-[50%] translate-y-[-50%] text-txt  text-xs'>
                        <PasswordIcon className='text-xs' />
                      </span>
                    </div>
                    <p className='text-sm text-red-500 text-left'>
                      {errors.code?.message}
                    </p>
                    <p className='text-sm text-red-500 text-left'>
                      {code && code}
                    </p>
                  </div>
                )}
                <button className=' bg-my-yellow  py-2 px-16 text-black font-bold rounded-xl outline-none border-none'>
                  {value ? "Login" : "Send Sms"}
                </button>
              </form>
              {/* forget password */}
              <div className='text-left flex flex-col gap-1  w-full mt-6'>
                <h6
                  className='text-xs text-my-yellow hover:underline cursor-pointer'
                  onClick={() => setForgetPass(!forgetPass)}>
                  Login with username and password ?
                </h6>
              </div>
            </motion.div>
          ) : (
            <Tilt className='w-[380px] h-full '>
              <motion.div
                initial={{
                  rotate: "0deg",
                  scale: 0,
                  y: 0,
                }}
                animate={{
                  rotate: "360deg",
                  scale: 1,
                  y: [0, 200, -200, -200, 0], //keyframe
                }}
                exit={{
                  rotate: "0deg",
                  scale: 0,
                  y: 0,
                  // when you use exit props should be in AnimatePresence cmp
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.25, 0.5, 0.85, 1], //keyframe
                  ease: "backInOut",
                }}
                className='w-full h-full hover:shadow-xl pb-8 duration-300 hover:shadow-my-yellow/20  p-2 px-5 pt-10 rounded-xl flex flex-col items-center gap-2 bg-bg-100'>
                <h5
                  className='font-bold text-xl'
                  style={{ letterSpacing: "2px" }}>
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
                        autoFocus
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
                  <h6
                    className='text-xs text-my-yellow hover:underline cursor-pointer'
                    onClick={() => setForgetPass(!forgetPass)}>
                    Forget Password?
                  </h6>
                  <h6
                    className='text-xs text-my-yellow hover:underline cursor-pointer'
                    onClick={handlePageType}>
                    Are you don't have an account? Register
                  </h6>
                </div>
              </motion.div>
            </Tilt>
          )}
          {/* image */}
          <div className='w-[50%] flex justify-center '>
            <img
              className='w-[40%] -translate-y-9'
              src={process.env.NEXT_PUBLIC_DB_HOST + banner[3]?.image}
              alt={banner[3]?.title}
            />
          </div>
          {/* <DevTool control={control} /> */}
        </motion.div>
      )}
    </>
  );
}
