"use client";
import PasswordIcon from "@/components/icon/password";
import PhoneIcon from "@/components/icon/phone";
import UserIcon from "@/components/icon/user";
import { login } from "@/Store/Slices/authSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Tilt from "react-parallax-tilt";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from 'framer-motion';

export default function Register({ banner, handlePageType }) {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { token } = useSelector((state) => state?.persistedReducer?.authSlice);
  const router = useRouter();
  const dispatch=useDispatch()
  const { errors } = formState;
  const onSubmit = async (e) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + "auth/register",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(e),
        }
      );
      const data = await res.json();
      dispatch(login({ user: data?.data?.user, token: data?.data?.token }));
    } catch (error) {
      console.log(error);
    }
  };
  if(token){
    router.push('/profile/wallet')
   }
  return (
    <>
   
      {banner && (
        <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 1, y: 0 }}
          className='w-full h-full flex justify-center p-10 '>
          {/* image */}
          <div className='w-[50%] flex justify-center '>
            <img
              className='w-[40%] -translate-y-9 flip'
              src={process.env.NEXT_PUBLIC_DB_HOST + banner[3]?.image}
              alt={banner[3]?.title}
            />
          </div>
          {/* form */}
          <Tilt className='h-full w-[380px]'>
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
              className='relative w-full pb-8 h-full hover:shadow-xl duration-300 hover:shadow-my-yellow/20  p-2 pb-3 px-5 pt-10 rounded-xl flex flex-col items-center gap-2 bg-bg-100'>
              <h5
                className='font-bold text-xl'
                style={{ letterSpacing: "2px" }}>
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
                <button
                  type='submit'
                  className=' bg-my-yellow py-2 px-16 text-black font-bold rounded-xl outline-none border-none'>
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
            </motion.div>
          </Tilt>

          {/* <DevTool control={control} /> */}
        </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
