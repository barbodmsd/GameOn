"use client";

import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { login } from "@/Store/Slices/authSlice";
import SolidHeart from "@/components/icon/solidHeart";
import Heart from "@/components/icon/Heart";
import { useDispatch, useSelector } from "react-redux";

export default function index({ product, id }) {
  const { user, token } = useSelector(
    (state) => state.persistedReducer.authSlice
  );
  const [quantity, setQuantity] = useState(0);
  const [activBtn, setActiveBtn] = useState("details");
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const { images, title, price, description, color, brand } = product;
  const colors = color?.map((e, index) => (
    <div key={index} className={`w-6 h-6 bg-${e} rounded-full`}></div>
  ));
  const addToCart = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/add-cart`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId: id,
            quantity: quantity,
          }),
        }
      );
      const data = await res.json();
      dispatch(login({ user: data?.data?.user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async () => {
    try {
      setValue(!value);
      if (!value) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_DB_HOST + `users/${user._id}/favorites`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: product._id }),
          }
        );
        const data = await res.json();
        dispatch(login({ user: data?.data?.user, token }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-black my-10">
      <div className="flex justify-stretch pl-11 w-full gap-10 h-screen">
        <div className=" w-[340px] h-[700px] bg-my-yellow flex flex-col items-center justify-between py-10">
          <div className="w-52 h-52 rounded-xl bg-[#85B200]">
            <img
              src="http://localhost:7000/bag-ds.png"
              alt="image"
              className="p-5"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <div>
              <h5 className="font-bold text-xs ">PRODUCT QUANTITY</h5>
            </div>
            <div className="flex gap-4 ">
              <button
                type="button"
                onClick={() => {
                  setQuantity(1);
                }}
                className={` border-2 border-black px-3 py-1 rounded-lg font-bold text-xl ${
                  quantity === 1 ? "bg-black text-white" : ""
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuantity(2);
                }}
                className={` border-2 border-black px-3 py-1 rounded-lg font-bold text-xl ${
                  quantity === 2 ? "bg-black text-white" : ""
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuantity(3);
                }}
                className={` border-2 border-black px-3 py-1 rounded-lg font-bold text-xl ${
                  quantity === 3 ? "bg-black text-white" : ""
                }`}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuantity(4);
                }}
                className={` border-2 border-black px-3 py-1 rounded-lg font-bold text-xl ${
                  quantity === 4 ? "bg-black text-white" : ""
                }`}
              >
                4
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-around   ">
          {/* btn */}
          <div className="flex gap-5 justify-end text-sm">
            <button
              type="button"
              onClick={() => setActiveBtn("details")}
              className={
                activBtn == "details" ? "btn-focus" : "btn-notFocus text-sm"
              }
            >
              details
            </button>
            <button
              type="button"
              onClick={() => setActiveBtn("description")}
              className={
                activBtn == "description" ? "btn-focus" : "btn-notFocus text-sm"
              }
            >
              Description
            </button>
          </div>
          {/* image */}
          <div className=" absolute left-[30%] w-[35%] mb-10">
            <Tilt>
              <img
                src={process.env.NEXT_PUBLIC_DB_HOST + images[0]}
                alt=""
                className=" "
              />
            </Tilt>
          </div>
          <dev className="h-full"></dev>
          {/* text */}
          <div className="text-white">
            <p className="text-sm text-[#6b6b6b]">
              Original Product ( {brand})
            </p>
            <div className="flex gap-5">
              <h5 className="my-4 text-2xl">{title.slice(0, 10)}</h5>
              <button
                onClick={handleClick}
                className=" text-6xl text-my-yellow"
              >
                {value ? <SolidHeart /> : <Heart />}
              </button>
            </div>
          </div>
          {/* price an btn */}
          <div className="flex items-center gap-20">
            <span className="text-my-yellow font-bold text-lg">${price} </span>
            <button
              onClick={addToCart}
              type="button"
              className="bg-my-yellow px-5 py-2 rounded-full flex gap-2 font-bold text-sm "
            >
              ORDER NOW{" "}
              <svg
                className=" size-5"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.948 11.5C6.948 11.3094 7.02372 11.1266 7.15851 10.9918C7.29331 10.857 7.47612 10.7812 7.66675 10.7812H15.3334C15.524 10.7812 15.7069 10.857 15.8416 10.9918C15.9764 11.1266 16.0522 11.3094 16.0522 11.5C16.0522 11.6906 15.9764 11.8734 15.8416 12.0082C15.7069 12.143 15.524 12.2188 15.3334 12.2188H7.66675C7.47612 12.2188 7.29331 12.143 7.15851 12.0082C7.02372 11.8734 6.948 11.6906 6.948 11.5ZM9.58341 13.6562C9.39279 13.6562 9.20997 13.732 9.07518 13.8668C8.94039 14.0016 8.86466 14.1844 8.86466 14.375C8.86466 14.5656 8.94039 14.7484 9.07518 14.8832C9.20997 15.018 9.39279 15.0938 9.58341 15.0938H13.4167C13.6074 15.0938 13.7902 15.018 13.925 14.8832C14.0598 14.7484 14.1355 14.5656 14.1355 14.375C14.1355 14.1844 14.0598 14.0016 13.925 13.8668C13.7902 13.732 13.6074 13.6562 13.4167 13.6562H9.58341Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.0539 2.23298C14.2243 2.14777 14.4216 2.13372 14.6024 2.19392C14.7832 2.25412 14.9326 2.38364 15.018 2.55402L16.7554 6.02893C17.1656 6.05002 17.5384 6.08164 17.8767 6.13052C18.8887 6.27523 19.7263 6.58764 20.3214 7.32364C20.9165 8.0606 21.0468 8.94418 20.9769 9.96385C20.9098 10.9519 20.6415 12.1987 20.308 13.756L19.8758 15.7752C19.6505 16.8265 19.4675 17.6784 19.2375 18.3435C18.9979 19.0383 18.6817 19.6085 18.1431 20.0446C17.6045 20.4806 16.9797 20.6694 16.2513 20.7585C15.5518 20.8438 14.6797 20.8438 13.6063 20.8438H9.3935C8.31825 20.8438 7.44712 20.8438 6.74754 20.7585C6.01921 20.6694 5.39437 20.4806 4.85579 20.0446C4.31625 19.6085 4.00096 19.0383 3.76137 18.3445C3.53137 17.6784 3.34929 16.8265 3.12312 15.7761L2.69092 13.7569C2.35742 12.1987 2.09004 10.9519 2.022 9.96385C1.95204 8.94418 2.08237 8.0606 2.6775 7.32364C3.27167 6.58764 4.10925 6.27523 5.12125 6.13052C5.45954 6.0826 5.83329 6.05002 6.2425 6.02893L7.98283 2.55402C8.06887 2.385 8.21822 2.25683 8.39834 2.19745C8.57846 2.13807 8.77475 2.15228 8.94443 2.237C9.11411 2.32171 9.24344 2.47006 9.30422 2.64972C9.365 2.82937 9.35231 3.02576 9.26892 3.1961L7.86975 5.99156C8.21858 5.98964 8.58563 5.98964 8.97088 5.98964H14.029C14.4142 5.98964 14.7812 5.98964 15.1301 5.99156L13.7319 3.1961C13.6467 3.02567 13.6326 2.82838 13.6928 2.6476C13.753 2.46682 13.8825 2.31734 14.0529 2.23202M5.49308 7.53064L5.10687 8.30306C5.06385 8.3876 5.03797 8.47981 5.03076 8.5744C5.02354 8.66898 5.03511 8.76406 5.06481 8.85414C5.09451 8.94423 5.14175 9.02755 5.2038 9.09929C5.26586 9.17104 5.3415 9.22979 5.42637 9.27216C5.51124 9.31453 5.60365 9.33968 5.69829 9.34617C5.79293 9.35265 5.88791 9.34034 5.97776 9.30994C6.06762 9.27954 6.15057 9.23166 6.22183 9.16904C6.29309 9.10643 6.35125 9.03034 6.39296 8.94514L7.14717 7.43673C7.69342 7.42714 8.31633 7.42618 9.02933 7.42618H13.9705C14.6835 7.42618 15.3064 7.42618 15.8527 7.43577L16.6069 8.94514C16.6929 9.11416 16.8423 9.24233 17.0224 9.30171C17.2025 9.36109 17.3988 9.34688 17.5685 9.26216C17.7382 9.17745 17.8675 9.0291 17.9283 8.84944C17.989 8.66979 17.9764 8.4734 17.893 8.30306L17.5068 7.53064L17.6735 7.55268C18.5207 7.67439 18.9356 7.89577 19.204 8.22639C19.4723 8.55798 19.6007 9.01127 19.5423 9.86514C19.4828 10.7372 19.2394 11.8834 18.8906 13.5116L18.4785 15.4283C18.2418 16.5351 18.076 17.3008 17.8786 17.8739C17.6869 18.4298 17.4914 18.723 17.2394 18.9262C16.9883 19.1294 16.6596 19.2597 16.0779 19.3306C15.4751 19.4044 14.6912 19.4054 13.5594 19.4054H9.4395C8.30867 19.4054 7.52475 19.4044 6.92196 19.3306C6.33929 19.2597 6.01154 19.1294 5.76046 18.9262C5.50842 18.723 5.31196 18.4288 5.12125 17.8739C4.92287 17.3008 4.75708 16.5351 4.52037 15.4283L4.10925 13.5116C3.76042 11.8824 3.517 10.7382 3.45758 9.86514C3.39912 9.01127 3.5285 8.55798 3.79587 8.22639C4.06421 7.89577 4.47917 7.67439 5.32633 7.55268L5.49308 7.53064Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="pt-20">
          <div className="rotate-90 w-[100px] ">
            <span className="text-bg-300 text-[130px] font-bold ">
              {" "}
              {brand.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-around pl-32 ">
          <div className="flex flex-col gap-5">
            <div className="w-40 h-40 rounded-xl bg-white">
              <img src={process.env.NEXT_PUBLIC_DB_HOST + images[0]} alt="" />
            </div>
            <div className="w-40 h-40 rounded-xl bg-white">
              <img src={process.env.NEXT_PUBLIC_DB_HOST + images[2]} alt="" />
            </div>
            <div className="w-40 h-40 rounded-xl bg-white">
              <img src={process.env.NEXT_PUBLIC_DB_HOST + images[3]} alt="" />
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <div className="text-white font-bold text-sm">SELECT A COLOR</div>
            <div className="flex gap-4">{colors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
