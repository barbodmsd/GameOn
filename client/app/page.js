"use client";

import fetchData from "@/Utils/FetchData";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import DigitalProductCard from "@/components/DigitalProductCard";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import PhysicalProductCard from "./physical-product-page/PhysicalProductCard";

export default function Home() {
  const [products, setProducts] = useState();
  const [productsG, setProductsG] = useState();
  const [imageSlider, setImageSlider] = useState([]); // Initialize as empty array
  const [banner, setBanner] = useState();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const refTow = useRef(null);
  const inViewTow = useInView(refTow, { once: true });
  // Fetch sliders data
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await fetchData("sliders");
  //       const resBanner = await fetchData("banners");
  //       const resProducts = await fetchData("products?key=physical");
  //       const resProductsG = await fetchData("products?key=digital");
  //       setProducts(resProducts.data);
  //       setProductsG(resProductsG.data);
  //       setImageSlider(res.data);
  //       setBanner(resBanner.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DB_HOST+"sliders");
        const data=await res.json()
        const resBanner = await fetch(process.env.NEXT_PUBLIC_DB_HOST+"banners");
        const dataBanner=await resBanner.json()
        const resProducts = await fetch(process.env.NEXT_PUBLIC_DB_HOST+"products?key=physical");
        const dataProducts=await resProducts.json()
        const resProductsG = await fetch(process.env.NEXT_PUBLIC_DB_HOST+"products?key=digital");
        const dataProductsG=await resProductsG.json()
        setProducts(dataProducts.data);
        setProductsG(dataProductsG.data);
        setImageSlider(data.data);
        setBanner(dataBanner.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  // Create SwiperSlide components
  const sliders = imageSlider.map((e, index) => (
    <SwiperSlide key={index}>
      <img
        className="w-full h-96 rounded-xl"
        src={process.env.NEXT_PUBLIC_DB_HOST + e.image}
      />
    </SwiperSlide>
  ));

  const banerImage = banner?.map((e, index) => (
    <img
      key={index}
      src={process.env.NEXT_PUBLIC_DB_HOST + e.image}
      className=" w-[499px]"
    />
  ));

  const cards = products?.map((product, index) => (
    <SwiperSlide key={index}>
      <PhysicalProductCard
        id={product._id}
        title={product.title}
        brand={product.brand}
        price={product.price}
        image={process.env.NEXT_PUBLIC_DB_HOST + product.images[0]}
      />
    </SwiperSlide>
  ));
  const cardsTow = productsG?.map((product, index) => (
    <SwiperSlide key={index}>
      <DigitalProductCard
        id={product._id}
        title={product.title}
        brand={product.brand}
        price={product.price}
        img={process.env.NEXT_PUBLIC_DB_HOST + product.images[0]}
      />
    </SwiperSlide>
  ));
  return (
    <>
      <div className="px-8 mt-5 w-[1229px]">
        <div className="w-[1229px]">
          <Swiper
            className="w-full h-96"
            loop={true}
            spaceBetween={30}
            autoplay={{
              delay: 3500,
            }}
            modules={[Autoplay]}
          >
            {sliders}
          </Swiper>
        </div>
        <div className="w-[1229px] py-20 ">
          <h2 className="text-2xl font-bold">Products</h2>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className=" w-full my-10"
          >
            {cards}
          </Swiper>
        </div>
        <div ref={ref} className=""></div>
        {inView && (
          <div className="show-div flex justify-center gap-10 w-[1229px] py-10  ">
            <motion.div
              initial={{ opacity: 0, x: -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {banerImage ? banerImage[4] : ""}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {banerImage ? banerImage[5] : ""}
            </motion.div>
          </div>
        )}
        <div className="w-[1229px] my-20 ">
          <h2 className="text-2xl font-bold">Products</h2>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className=" w-full my-10"
          >
            {cardsTow}
          </Swiper>
        </div>
        <div ref={refTow}></div>
        {inViewTow && (
          <div className="flex justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-[268px] h-[375px] rounded-2xl "
            >
             {banerImage ? banerImage[6] : ""}
            </motion.div>
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-[493px] h-[148px] rounded-2xl "
              >
                {banerImage ? banerImage[8] : ""}
              </motion.div>
              <div className="flex justify-center gap-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-[237px] h-[210px] rounded-2xl bg-bg-300"
                >
                  {banerImage ? banerImage[10] : ""}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-[237px] h-[210px] rounded-2xl bg-bg-300"
                >
                  {banerImage ? banerImage[9] : ""}
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-[268px] h-[375px] rounded-2xl "
            >
             {banerImage ? banerImage[7] : ""}
            </motion.div>
          </div>
        )}
        <div className="w-[1229px] my-20 ">
          <h2 className="text-2xl font-bold">Products</h2>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className=" w-full my-10"
          >
            {cardsTow}
          </Swiper>
        </div>
      </div>
    </>
  );
}
