"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "@/Utils/FetchData";
import { login } from "@/Store/Slices/authSlice";
import { useRouter } from "next/navigation";
import Tilt from "react-parallax-tilt";
import Loading from "@/components/Loading";
import CardFavorite from "../CardFavorite";
import Link from "next/link";

const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`http://localhost:7000/products/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    console.log(`Response for product ${productId}:`, product); // Log the product response
    return product;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
};
const OrderCard = ({id,name,image,price}) => {
  return (
    <div className='flex relative flex-col h-72 w-60 justify-center gap-5 items-center bg-bg-200 px-6 py-5 rounded-lg'>
      <Link
        href={`/digital-product-page/product-details/${id}/${name
          ?.replaceAll(" ", "-")
          ?.toLowerCase()}`}>
        <Tilt perspective={4000} glareMaxOpacity={1} scale={1}>
          <div className='h-[200px] w-[170px] '>
            <img
              src={process.env.NEXT_PUBLIC_DB_HOST + image}
              alt='product-image'
              srcSet=''
              className='w-[100%] h-[100%] rounded'
            />
          </div>
        </Tilt>
      </Link>
      {/* </Link> */}
      <div className='w-full text-left'>
        {" "}
        <div className='font-bold '>{name?.slice(0, 20)}</div>
        <div className='text-my-yellow '>${price}</div>
      </div>
      
    </div>
  );
};
export default function Wallet() {
  const router = useRouter();
  const token = useSelector(
    (state) => state?.persistedReducer?.authSlice?.token
  );
  const oldUser = useSelector(
    (state) => state?.persistedReducer?.authSlice?.user
  );
  const [user, setUser] = useState(oldUser);
  const [userBalance, setUserBalance] = useState();
  const [cardPrice, setCardPrice] = useState(0);
  const dispatch = useDispatch();
  const [orderProducts, setOrderProducts] = useState([]);
  const [order, setOrder] = useState();
  useEffect(() => {
    if (!token) {
      router.push("/auth");
    }
  }, [token, router]);
  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const resUser = await fetchData(`users/${user?._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserBalance(resUser?.data);
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    if (token && user?._id) {
      fetchUserBalance();
    }
  }, [token, user?._id]);

  const postUserData = async () => {
    try {
      const resPost = await fetch(
        process.env.NEXT_PUBLIC_DB_HOST + `users/${user?._id}/wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            wallet: {
              balance: cardPrice,
            },
          }),
        }
      );
      const data = await resPost.json();
      setUserBalance(data?.data);
      dispatch(login({ user: data?.data?.user, token }));
      setUser(data?.data?.user);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };

  const handlePriceCard = (value) => {
    setCardPrice(value);
  };

  const handleAddPrice = () => {
    postUserData();
  };
  const newWallet = user?.wallet?.balance;
  const items = user.orders?.map((e, index) =>{ 
    return <OrderCard
      key={index}
      id={e?._id}
      name={e?.title}
      price={e?.price}
      image={e?.images[0]}
    />
  });
  return (
    <>
      {token ? (
        <div className='mx-10'>
          <div className='mt-5'>
            <span className='text-txt font-bold text-lg'>{user?.username}</span>
            <h1 className='text-my-yellow font-bold text-2xl'>Good Day</h1>
          </div>
          <div className='main flex flex-col gap-5 bg-bg-300 w-full h-full my-8 p-5 rounded-3xl'>
            <div className='flex w-full gap-5'>
              <div className='bg-bg-100 w-[50%] h-full p-5 flex flex-col gap-32 rounded-2xl'>
                <div className='flex justify-between'>
                  <div>
                    <span className='text-3xl font-bold'>
                      {newWallet?.toFixed(2)}
                    </span>
                    <div className='flex gap-10'>
                      <span className='text-green-800 text-lg'>$ 20 +</span>
                      <span className='text-red-800 text-lg'>$ 5 -</span>
                    </div>
                  </div>
                  <div>
                    <span className='text-lg'>$</span>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='border-my-yellow border rounded-lg p-2'>
                    <span>$ {cardPrice}</span>
                  </div>
                  <button
                    type='button'
                    className='bg-my-yellow px-10 rounded-md text-bg-100 font-bold'
                    onClick={handleAddPrice}>
                    Add Wallet
                  </button>
                </div>
              </div>
              <div className='w-[50%] h-full flex flex-wrap gap-5 justify-center'>
                {[50, 100, 150, 200].map((value) => (
                  <button
                    key={value}
                    type='button'
                    onClick={() => handlePriceCard(value)}
                    className='w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow'>
                    $ {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className='w-full bg-bg-100 p-5 rounded-lg'>
                <h3>Purchases</h3>
                <div className='w-full flex gap-5 py-5 flex-wrap'>
                  {items ? items : <p>No products found for this order.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
