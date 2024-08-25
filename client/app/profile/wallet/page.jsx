"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "@/Utils/FetchData";
import { login } from "@/Store/Slices/authSlice";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

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
  console.log(user)
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

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.order && Array.isArray(user.order)) {
        console.log("Fetching products with IDs:", user.order); // Log product IDs
        const products = await Promise.all(
          user.order.map((productId) => fetchProductById(productId))
        );
        setOrderProducts(products.filter((product) => product?.data !== null));
      }
    };

    fetchFavorites();
  }, [user?.order]);

  const newWallet = user?.wallet?.balance;

  return (
    <>
      {token ? (
        <div className="mx-10">
          <div className="mt-5">
            <span className="text-txt font-bold text-lg">{user?.username}</span>
            <h1 className="text-my-yellow font-bold text-2xl">Good Day</h1>
          </div>
          <div className="main flex flex-col gap-5 bg-bg-300 w-full h-full my-8 p-5 rounded-3xl">
            <div className="flex w-full gap-5">
              <div className="bg-bg-100 w-[50%] h-full p-5 flex flex-col gap-32 rounded-2xl">
                <div className="flex justify-between">
                  <div>
                    <span className="text-3xl font-bold">
                      {newWallet?.toFixed(2)}
                    </span>
                    <div className="flex gap-10">
                      <span className="text-green-800 text-lg">$ 20 +</span>
                      <span className="text-red-800 text-lg">$ 5 -</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-lg">$</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="border-my-yellow border rounded-lg p-2">
                    <span>$ {cardPrice}</span>
                  </div>
                  <button
                    type="button"
                    className="bg-my-yellow px-10 rounded-md text-bg-100 font-bold"
                    onClick={handleAddPrice}
                  >
                    Add Wallet
                  </button>
                </div>
              </div>
              <div className="w-[50%] h-full flex flex-wrap gap-5 justify-center">
                {[50, 100, 150, 200].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handlePriceCard(value)}
                    className="w-[180px] h-[120px] bg-bg-100 hover:border hover:border-my-yellow rounded-2xl text-2xl hover:text-my-yellow"
                  >
                    $ {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="w-full bg-bg-100 p-5 rounded-lg">
                <h3>Purchases</h3>
                <div className="w-full flex flex-col gap-5 py-5">
                  {orderProducts.length > 0 ? (
                    orderProducts.map((product, index) => (
                      <div key={index} className="border p-3 rounded-lg">
                        <h4 className="text-xl font-bold">{product.data?.name}</h4>
                        <p>Price: ${product.data?.price}</p>
                        <p>Quantity: {product.data?.quantity}</p>
                      </div>
                    ))
                  ) : (
                    <p>No products found for this order.</p>
                  )}
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
