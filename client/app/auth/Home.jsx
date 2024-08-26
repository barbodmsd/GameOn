import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
export const HomeIcon = () => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='size-5'>
        <path
          fillRule='evenodd'
          d='M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z'
          clipRule='evenodd'
        />
      </svg>
    </>
  );
};
export default function HomeButton() {
  return (
    <Link href='/'>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [10, -10] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='fixed flex w-[100px] items-center justify-between top-[5%] px-10 left-[3%] btn-focus border-none hover:scale-105 duration-300 '>
            <HomeIcon/>
        <button>Home</button>
      </motion.div>
    </Link>
  );
}
