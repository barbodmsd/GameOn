import React from "react";
import Link from "next/link";
import "./style.css";

export default function SidNavProfile() {
  return (
    <div className="  w-72 max-md:fixed">
      <div className=" custom-scrollbar sidenav h-screen w-64 fixed z-10 max-md:-translate-x-full  transition-all px-14 bg-bg-200 overflow-y-auto  text-white ">
        <div className="logo my-6 flex gap-20 items-center ">
          <div>
            <h1 className=" text-2xl font-bold">GameOn</h1>
          </div>
          <div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.01594 3.98206C4.74993 3.98206 4.49481 4.08773 4.30671 4.27583C4.11861 4.46393 4.01294 4.71904 4.01294 4.98506C4.01294 5.25107 4.11861 5.50618 4.30671 5.69428C4.49481 5.88238 4.74993 5.98806 5.01594 5.98806H12.9659C13.232 5.98806 13.4871 5.88238 13.6752 5.69428C13.8633 5.50618 13.9689 5.25107 13.9689 4.98506C13.9689 4.71904 13.8633 4.46393 13.6752 4.27583C13.4871 4.08773 13.232 3.98206 12.9659 3.98206H5.01594ZM4.01594 9.00006C4.01594 8.44806 4.46294 7.99706 5.01594 7.99706H12.9659C13.232 7.99706 13.4871 8.10273 13.6752 8.29083C13.8633 8.47893 13.9689 8.73404 13.9689 9.00006C13.9689 9.26607 13.8633 9.52119 13.6752 9.70928C13.4871 9.89738 13.232 10.0031 12.9659 10.0031H5.01594C4.46294 10.0031 4.01594 9.55306 4.01594 9.00006ZM5.02494 12.0121C4.75879 12.0121 4.50355 12.1178 4.31536 12.306C4.12716 12.4942 4.02144 12.7494 4.02144 13.0156C4.02144 13.2817 4.12716 13.5369 4.31536 13.7251C4.50355 13.9133 4.75879 14.0191 5.02494 14.0191H12.9749C13.2411 14.0191 13.4963 13.9133 13.6845 13.7251C13.8727 13.5369 13.9784 13.2817 13.9784 13.0156C13.9784 12.7494 13.8727 12.4942 13.6845 12.306C13.4963 12.1178 13.2411 12.0121 12.9749 12.0121H5.02494Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H15C15.7956 0 16.5587 0.316071 17.1213 0.87868C17.6839 1.44129 18 2.20435 18 3V15C18 15.7956 17.6839 16.5587 17.1213 17.1213C16.5587 17.6839 15.7956 18 15 18H3C2.20435 18 1.44129 17.6839 0.87868 17.1213C0.316071 16.5587 0 15.7956 0 15V3ZM3 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289C15.8946 2.48043 16 2.73478 16 3V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H3C2.73478 16 2.48043 15.8946 2.29289 15.7071C2.10536 15.5196 2 15.2652 2 15V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className="my-10">
          <ul className="space-y-5 text-[#7D8085]">
            {/* Dashboard */}
            <li className={`text-sm flex items-center gap-3`}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 7.82031H3.5C2.11929 7.82031 1 8.7927 1 9.99216V11.0781H6H11V9.99216C11 8.7927 9.88069 7.82031 8.5 7.82031Z"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 5.64847C7.38069 5.64847 8.5 4.6761 8.5 3.47662C8.5 2.27715 7.38069 1.30478 6 1.30478C4.61929 1.30478 3.5 2.27715 3.5 3.47662C3.5 4.6761 4.61929 5.64847 6 5.64847Z"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/profile"}>Dashboard</Link>
            </li>
            {/* Wallet */}
            <li className={`text-sm flex items-center gap-3`}>
            <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 3.08314V6.99247M2.11111 8.94713H9.8889C10.5025 8.94713 11 8.36369 11 7.64404V2.43159C11 1.7119 10.5025 1.12848 9.8889 1.12848H2.11111C1.49746 1.12848 1 1.7119 1 2.43159V7.64404C1 8.36369 1.49746 8.94713 2.11111 8.94713Z"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3.36237H7.05264C6.18059 3.36237 5.47369 4.11245 5.47369 5.03778C5.47369 5.96311 6.18059 6.7132 7.05264 6.7132H11"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.05261 5.03778V5.0435"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/post"}>Wallet</Link>
            </li>
            {/* Favorite */}
            <li className={`text-sm flex items-center gap-3 relative`}>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.73967 5.22331L6 9.54126L10.2603 5.22331C10.7339 4.74328 11 4.09226 11 3.41343C11 1.99983 9.86933 0.853882 8.47461 0.853882C7.80483 0.853882 7.1625 1.12355 6.68889 1.60355L6 2.30178L5.31111 1.60355C4.83749 1.12355 4.19516 0.853882 3.52538 0.853882C2.13065 0.853882 1 1.99983 1 3.41343C1 4.09226 1.26607 4.74328 1.73967 5.22331Z"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/post"}>Favorite</Link>
            </li>
            {/* Settings */}
            <li className={`text-sm flex items-center gap-3 relative`}>
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 3.08314V6.99247M2.11111 8.94713H9.8889C10.5025 8.94713 11 8.36369 11 7.64404V2.43159C11 1.7119 10.5025 1.12848 9.8889 1.12848H2.11111C1.49746 1.12848 1 1.7119 1 2.43159V7.64404C1 8.36369 1.49746 8.94713 2.11111 8.94713Z"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3.36237H7.05264C6.18059 3.36237 5.47369 4.11245 5.47369 5.03778C5.47369 5.96311 6.18059 6.7132 7.05264 6.7132H11"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.05261 5.03778V5.0435"
                  stroke="#7D8085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link href={"/post"}>Settings</Link>
            </li>
          </ul>
        </div>
        <div className="bu  my-8">
          <Link href={"/"}>
            {" "}
            <button className="bg-[#BDFD00] w-24 h-8 text-black rounded-2xl translate-x-0 hover:bg-[#8eb41b] transition-all text-xs font-bold ">
              go to home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
