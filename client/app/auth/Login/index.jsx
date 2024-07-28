import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const form = useForm();
  const { register, handleSubmit, errors } = form;

  return (
    <div className='w-full h-full flex justify-evenly p-10 '>
      {/* form */}
      <div className='w-[350px] h-[400px] p-2 px-5 pt-10 rounded-xl flex flex-col items-center gap-2 bg-bg-100'>
        <h5>LOGIN</h5>
        <form noValidate className='flex w-full items-center p-1 flex-col gap-2'>
          {/* username */}
          <div className=" w-full flex flex-col gap-2 text-left">
            <label className="" htmlFor='username'>Username</label>
            <div className="w-full relative">
              <input
              className="w-full pl-8 py-2 px-4 rounded-xl bg-bg-200"
                type='text'
                id='username'
                placeholder='Username'
                {...register("username", {
                  required: "username is required",
                })}
              />
              <span className="absolute left-[4%] top-[50%] translate-y-[-50%] ">m</span>
            </div>
          </div>
        </form>
      </div>
      <div className='w-[50%] '></div>
    </div>
  );
}
