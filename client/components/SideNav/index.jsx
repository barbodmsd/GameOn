"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.css";
import { useSelector } from "react-redux";

export default function SidNav() {
  const { user } = useSelector((state) => state.persistedReducer.authSlice);
  const pageAddress = usePathname();
  return (
    <div className='  w-72 max-md:fixed'>
      <div className=' custom-scrollbar sidenav h-screen w-64 fixed z-10 max-md:-translate-x-full  transition-all px-14 bg-[#191919] overflow-y-auto  text-white '>
        <div className='logo my-6 '>
          <h1 className=' text-2xl font-bold'>GameOn</h1>
        </div>
        <div className='bu  my-8'>
          <Link href={"/"}>
            {" "}
            <button className='bg-[#BDFD00] w-24 h-8 text-black rounded-2xl translate-x-0 hover:bg-[#8eb41b] transition-all text-xs font-bold '>
              go to home
            </button>
          </Link>
        </div>
        <div className='my-10'>
          <ul className='space-y-5 text-[#7D8085]'>
            {/* profile */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/profile/wallet"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.5 7.82031H3.5C2.11929 7.82031 1 8.7927 1 9.99216V11.0781H6H11V9.99216C11 8.7927 9.88069 7.82031 8.5 7.82031Z'
                  stroke='#7D8085'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M6 5.64847C7.38069 5.64847 8.5 4.6761 8.5 3.47662C8.5 2.27715 7.38069 1.30478 6 1.30478C4.61929 1.30478 3.5 2.27715 3.5 3.47662C3.5 4.6761 4.61929 5.64847 6 5.64847Z'
                  stroke='#7D8085'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <Link href={"/profile/wallet"}>Profile</Link>
            </li>
            {/* Balance */}
            <li
              className={`text-sm flex items-center gap-3 relative ${
                pageAddress === "/profile/wallet"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='12'
                height='10'
                viewBox='0 0 12 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 3.08314V6.99247M2.11111 8.94713H9.8889C10.5025 8.94713 11 8.36369 11 7.64404V2.43159C11 1.7119 10.5025 1.12848 9.8889 1.12848H2.11111C1.49746 1.12848 1 1.7119 1 2.43159V7.64404C1 8.36369 1.49746 8.94713 2.11111 8.94713Z'
                  stroke='#7D8085'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11 3.36237H7.05264C6.18059 3.36237 5.47369 4.11245 5.47369 5.03778C5.47369 5.96311 6.18059 6.7132 7.05264 6.7132H11'
                  stroke='#7D8085'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7.05261 5.03778V5.0435'
                  stroke='#7D8085'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <Link href={"/profile/wallet"}>Balance</Link>
              <div className=' flex items-center absolute  bg-[#BDFD00] -right-11 rounded-lg text-black px-2 h-6 w-15 font-bold'>
                $ {user?.wallet?.balance}
              </div>
            </li>
          </ul>
        </div>
        {/* categories */}
        <div className='my-10 '>
          <h5 className='text-txt font-bold'> Categories</h5>
          <ul className='space-y-5 my-5 text-[#7D8085]'>
            {/* Mouse */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/mouse"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='12'
                height='17'
                viewBox='0 0 12 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11.1818 2.74445C11.3987 2.74421 11.6067 2.65989 11.7601 2.50998C11.9135 2.36007 11.9998 2.15682 12 1.94481V0.612091H10.9091V1.67827H4.90909C4.69217 1.67851 4.4842 1.76283 4.33082 1.91274C4.17743 2.06265 4.09115 2.2659 4.09091 2.4779V3.81063H3.02131C2.22028 3.81151 1.45233 4.12289 0.885917 4.67646C0.319507 5.23003 0.000902308 5.98058 0 6.76344V12.0925C0 14.5806 2.07113 16.6048 4.6169 16.6048H4.65583C7.2016 16.6048 9.27273 14.5806 9.27273 12.0925V6.76344C9.27183 5.98058 8.95322 5.23003 8.38681 4.67646C7.8204 4.12289 7.05244 3.81151 6.25142 3.81063H5.18182V2.74445H11.1818ZM1.09091 6.76344C1.09149 6.26325 1.29505 5.7837 1.65695 5.43001C2.01884 5.07632 2.50951 4.87737 3.02131 4.8768H4.09091V7.8088H1.09091V6.76344ZM8.18182 12.0925C8.18077 13.0062 7.80895 13.8821 7.14792 14.5281C6.4869 15.1742 5.59066 15.5376 4.65583 15.5386H4.6169C3.68207 15.5376 2.78583 15.1742 2.1248 14.5281C1.46378 13.8821 1.09196 13.0062 1.09091 12.0925V8.87497H8.18182V12.0925ZM6.25142 4.8768C6.76322 4.87737 7.25389 5.07632 7.61578 5.43001C7.97767 5.7837 8.18124 6.26325 8.18182 6.76344V7.8088H5.18182V4.8768H6.25142Z'
                  fill='#7D8085'
                />
              </svg>

              <Link href={"/mouse"}>Mouse</Link>
            </li>
            {/* Head phones */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/head-phone"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 10.6146H2.66667C3.28032 10.6146 3.77778 10.1285 3.77778 9.5287V7.8998C3.77778 7.30004 3.28032 6.81387 2.66667 6.81387H1'
                  stroke='#7D8085'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11 10.6146H9.33334C8.71967 10.6146 8.22223 10.1285 8.22223 9.5287V7.8998C8.22223 7.30004 8.71967 6.81387 9.33334 6.81387H11'
                  stroke='#7D8085'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M1 6.81389V10.6146V5.72797C1 3.02914 3.23858 0.841309 6 0.841309C8.76144 0.841309 11 3.02914 11 5.72797V10.6146V6.81389'
                  stroke='#7D8085'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              <Link href={"/head-phone"}>Head phones</Link>
            </li>
            {/* Gamepads */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/gamepads"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='19'
                height='19'
                viewBox='0 0 19 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M5.64065 9.41853V7.31904M4.56676 8.3686H6.71455M6.80321 5.54877V4.92477C6.80321 4.70039 6.61678 4.51779 6.3868 4.51779H4.89451C4.66492 4.51779 4.47809 4.7 4.47809 4.92477V5.60951'
                  stroke='#7D8085'
                  strokeWidth='0.479167'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.4966 10.9818L13.2988 13.6241C13.5747 14.028 13.9858 14.3255 14.4616 14.4655C14.9374 14.6055 15.4483 14.5793 15.9065 14.3913C16.3647 14.2033 16.7416 13.8654 16.9726 13.4354C17.2036 13.0054 17.2743 12.5102 17.1724 12.0349C16.7829 10.2282 16.4722 8.54307 16.1544 7.39951C15.8195 6.19522 14.6169 5.35689 13.2711 5.35689C12.4589 5.35689 11.7226 5.67025 11.1779 6.1782H7.82207C7.25898 5.65081 6.5092 5.35642 5.72929 5.35651C4.38307 5.35651 3.18013 6.19522 2.84565 7.39913C2.52779 8.54307 2.21707 10.2282 1.82757 12.0349C1.72566 12.5103 1.79629 13.0056 2.02733 13.4356C2.25838 13.8657 2.63542 14.2037 3.09372 14.3917C3.55201 14.5797 4.06297 14.6058 4.53885 14.4657C5.01473 14.3255 5.42584 14.0278 5.70159 13.6237L7.50382 10.9814L11.4966 10.9818Z'
                  stroke='#7D8085'
                  strokeWidth='0.479167'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12.1968 5.54877V4.92477C12.1968 4.70039 12.3833 4.51779 12.6133 4.51779H14.1055C14.3351 4.51779 14.522 4.7 14.522 4.92477V5.60951'
                  stroke='#7D8085'
                  strokeWidth='0.479167'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12.2827 8.65875C12.4467 8.65875 12.5796 8.52885 12.5796 8.36861C12.5796 8.20836 12.4467 8.07846 12.2827 8.07846C12.1188 8.07846 11.9858 8.20836 11.9858 8.36861C11.9858 8.52885 12.1188 8.65875 12.2827 8.65875Z'
                  fill='#7D8085'
                />
                <path
                  d='M14.4333 8.65875C14.5972 8.65875 14.7302 8.52885 14.7302 8.36861C14.7302 8.20836 14.5972 8.07846 14.4333 8.07846C14.2693 8.07846 14.1364 8.20836 14.1364 8.36861C14.1364 8.52885 14.2693 8.65875 14.4333 8.65875Z'
                  fill='#7D8085'
                />
                <path
                  d='M13.3594 7.60919C13.5233 7.60919 13.6562 7.47929 13.6562 7.31905C13.6562 7.1588 13.5233 7.0289 13.3594 7.0289C13.1954 7.0289 13.0625 7.1588 13.0625 7.31905C13.0625 7.47929 13.1954 7.60919 13.3594 7.60919Z'
                  fill='#7D8085'
                />
                <path
                  d='M13.3594 9.72222C13.531 9.72222 13.6701 9.58626 13.6701 9.41854C13.6701 9.25082 13.531 9.11485 13.3594 9.11485C13.1878 9.11485 13.0486 9.25082 13.0486 9.41854C13.0486 9.58626 13.1878 9.72222 13.3594 9.72222Z'
                  fill='#7D8085'
                />
              </svg>

              <Link href={"/gamepads"}>Gamepads</Link>
            </li>
            {/* keyboards */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/key-board"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='16'
                height='10'
                viewBox='0 0 16 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1.77029 9.08991H14.2354C15.408 9.08991 16 8.51719 16 7.3874V2.09251C16 0.957409 15.408 0.384415 14.2354 0.384415H1.77029C0.592 0.384415 0 0.957409 0 2.09223V7.3874C0 8.52222 0.592 9.08991 1.77029 9.08991ZM1.78743 8.20305C1.22343 8.20305 0.907429 7.91097 0.907429 7.33797V2.14193C0.907429 1.56894 1.22343 1.27155 1.78743 1.27155H14.2186C14.7766 1.27155 15.0923 1.56894 15.0923 2.14193V7.33797C15.0923 7.91097 14.7766 8.20305 14.2186 8.20305H1.78743ZM13.232 3.38733H13.632C13.7957 3.38733 13.8691 3.31557 13.8691 3.15584V2.76491C13.8691 2.61049 13.7957 2.53314 13.632 2.53314H13.232C13.0686 2.53314 12.9949 2.61049 12.9949 2.76491V3.15584C12.9949 3.31557 13.0686 3.38733 13.232 3.38733ZM11.4166 3.38733H11.8166C11.9803 3.38733 12.0594 3.31557 12.0594 3.15584V2.76491C12.0594 2.61049 11.9803 2.53314 11.8166 2.53314H11.4166C11.2586 2.53314 11.1794 2.61049 11.1794 2.76491V3.15584C11.1794 3.31557 11.2586 3.38733 11.4166 3.38733ZM9.60114 3.38733H10.0069C10.1649 3.38733 10.244 3.31557 10.244 3.15584V2.76491C10.244 2.61049 10.1649 2.53314 10.0069 2.53314H9.60114C9.44314 2.53314 9.36429 2.61049 9.36429 2.76491V3.15584C9.36429 3.31557 9.44314 3.38733 9.60114 3.38733ZM7.79143 3.38733H8.19171C8.35514 3.38733 8.42857 3.31557 8.42857 3.15584V2.76491C8.42857 2.61049 8.35514 2.53314 8.19171 2.53314H7.79143C7.628 2.53314 7.55457 2.61049 7.55457 2.76491V3.15584C7.55457 3.31557 7.628 3.38733 7.79143 3.38733ZM5.976 3.38733H6.38171C6.53971 3.38733 6.61886 3.31557 6.61886 3.15584V2.76491C6.61886 2.61049 6.53971 2.53314 6.38171 2.53314H5.976C5.81829 2.53314 5.73914 2.61049 5.73914 2.76491V3.15584C5.73914 3.31557 5.818 3.38733 5.976 3.38733ZM4.16086 3.38733H4.56686C4.72486 3.38733 4.80371 3.31557 4.80371 3.15584V2.76491C4.80371 2.61049 4.72486 2.53314 4.56686 2.53314H4.16114C4.00314 2.53314 3.924 2.61049 3.924 2.76491V3.15584C3.924 3.31557 4.00314 3.38733 4.16114 3.38733M2.35143 3.38733H2.75143C2.91514 3.38733 2.98857 3.31557 2.98857 3.15584V2.76491C2.98857 2.61049 2.91514 2.53314 2.75143 2.53314H2.35143C2.18771 2.53314 2.11429 2.61049 2.11429 2.76491V3.15584C2.11429 3.31557 2.18771 3.38733 2.35143 3.38733ZM5.97657 5.1616H6.38229C6.54029 5.1616 6.61943 5.08425 6.61943 4.92983V4.5389C6.61943 4.37918 6.54029 4.30741 6.38229 4.30741H5.97657C5.81886 4.30741 5.73971 4.37918 5.73971 4.5389V4.92983C5.73971 5.08425 5.81886 5.1616 5.97686 5.1616M7.79229 5.1616H8.19257C8.356 5.1616 8.42943 5.08425 8.42943 4.92983V4.5389C8.42943 4.37918 8.356 4.30741 8.19257 4.30741H7.79143C7.628 4.30741 7.55457 4.37918 7.55457 4.5389V4.92983C7.55457 5.08425 7.628 5.1616 7.79143 5.1616M9.60114 5.1616H10.0069C10.1649 5.1616 10.244 5.08425 10.244 4.92983V4.5389C10.244 4.37918 10.1649 4.30741 10.0069 4.30741H9.60114C9.44314 4.30741 9.36429 4.37918 9.36429 4.5389V4.92983C9.36429 5.08425 9.44314 5.1616 9.60114 5.1616ZM11.4166 5.1616H11.8166C11.9803 5.1616 12.0594 5.08425 12.0594 4.92983V4.5389C12.0594 4.37918 11.9803 4.30741 11.8166 4.30741H11.4166C11.2586 4.30741 11.1794 4.37918 11.1794 4.5389V4.92983C11.1794 5.08425 11.2586 5.1616 11.4166 5.1616ZM4.16057 5.1616H4.56657C4.72457 5.1616 4.80343 5.08425 4.80343 4.92983V4.5389C4.80343 4.37918 4.72457 4.30741 4.56657 4.30741H4.16086C4.00286 4.30741 3.92371 4.37918 3.92371 4.5389V4.92983C3.92371 5.08425 4.00257 5.1616 4.16057 5.1616ZM13.2323 5.1616H13.6323C13.796 5.1616 13.8694 5.08425 13.8694 4.92983V4.5389C13.8694 4.37918 13.796 4.30741 13.6323 4.30741H13.2323C13.0689 4.30741 12.9951 4.37918 12.9951 4.5389V4.92983C12.9951 5.08425 13.0689 5.1616 13.2323 5.1616ZM2.35114 5.1616H2.75143C2.91514 5.1616 2.98857 5.08425 2.98857 4.92983V4.5389C2.98857 4.37918 2.91514 4.30741 2.75143 4.30741H2.35143C2.18771 4.30741 2.11429 4.37918 2.11429 4.5389V4.92983C2.11429 5.08425 2.18743 5.1616 2.35114 5.1616ZM4.16114 6.93559H11.8171C11.9806 6.93559 12.0597 6.85852 12.0597 6.70439V6.30759C12.0597 6.15345 11.9806 6.0761 11.8169 6.0761H4.16086C4.00314 6.0761 3.92429 6.15345 3.92429 6.30759V6.70411C3.92429 6.85852 4.00314 6.93587 4.16086 6.93587M13.2323 6.93587H13.6323C13.796 6.93587 13.8694 6.8588 13.8694 6.70466V6.30787C13.8694 6.15373 13.796 6.07638 13.6323 6.07638H13.2323C13.0689 6.07638 12.9951 6.15373 12.9951 6.30787V6.70439C12.9951 6.8588 13.0689 6.93587 13.2323 6.93587ZM2.35114 6.93615H2.75143C2.91514 6.93615 2.98857 6.85908 2.98857 6.70494V6.30815C2.98857 6.15401 2.91514 6.07666 2.75143 6.07666H2.35143C2.18771 6.07666 2.11429 6.15401 2.11429 6.30815V6.70466C2.11429 6.85908 2.18771 6.93643 2.35143 6.93643'
                  fill='#7D8085'
                />
              </svg>
              <Link href={"/key-board"}>Keyboards</Link>
            </li>
            {/* computers */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/computers"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='13'
                height='13'
                viewBox='0 0 13 13'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_146_3879)'>
                  <path
                    d='M8.23335 12.38H11.7C11.9299 12.38 12.1503 12.2908 12.3128 12.1319C12.4754 11.9731 12.5667 11.7576 12.5667 11.533V1.36879C12.5667 1.14415 12.4754 0.928707 12.3128 0.76986C12.1503 0.611013 11.9299 0.521774 11.7 0.521774H8.23335C8.0035 0.521774 7.78306 0.611013 7.62052 0.76986C7.45799 0.928707 7.36668 1.14415 7.36668 1.36879V11.533C7.36668 11.7576 7.45799 11.9731 7.62052 12.1319C7.78306 12.2908 8.0035 12.38 8.23335 12.38ZM8.23335 12.38H3.46668M5.63335 9.83897V12.38M7.36668 4.75686H12.5667M8.66668 9.83897H11.2667M1.30002 3.06283H7.36668V9.83897H1.30002C1.07016 9.83897 0.849722 9.74973 0.68719 9.59088C0.524659 9.43203 0.43335 9.21659 0.43335 8.99195V3.90984C0.43335 3.6852 0.524659 3.46976 0.68719 3.31091C0.849722 3.15207 1.07016 3.06283 1.30002 3.06283Z'
                    stroke='#7D8085'
                    strokeWidth='1.53333'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_146_3879'>
                    <rect
                      width='13'
                      height='12.7053'
                      fill='white'
                      transform='translate(0 0.0982666)'
                    />
                  </clipPath>
                </defs>
              </svg>
              <Link href={"/computers"}>computers</Link>
            </li>
            {/* games */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/digital-product-page"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='14'
                height='15'
                viewBox='0 0 14 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7.58335 2.67588V4.19807L7.00002 4.76818L6.41669 4.19807V2.67588H7.58335ZM11.6667 6.66664V7.80686H10.1092L9.52585 7.23675L10.1092 6.66664H11.6667ZM3.89085 6.66664L4.47419 7.23675L3.89085 7.80686H2.33335V6.66664H3.89085ZM7.00002 9.70533L7.58335 10.2754V11.7976H6.41669V10.2754L7.00002 9.70533ZM8.75002 1.53566H5.25002V4.67126L7.00002 6.38159L8.75002 4.67126V1.53566ZM12.8334 5.52643H9.62502L7.87502 7.23675L9.62502 8.94708H12.8334V5.52643ZM4.37502 5.52643H1.16669V8.94708H4.37502L6.12502 7.23675L4.37502 5.52643ZM7.00002 8.09192L5.25002 9.80224V12.9378H8.75002V9.80224L7.00002 8.09192Z'
                  fill='#7D8085'
                />
              </svg>
              <Link href={"/digital-product-page"}>Games</Link>
            </li>
            {/* physical products */}
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/physical-product-page"
                  ? "text-[#BDFD00]"
                  : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='14'
                height='15'
                viewBox='0 0 14 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7.58335 2.67588V4.19807L7.00002 4.76818L6.41669 4.19807V2.67588H7.58335ZM11.6667 6.66664V7.80686H10.1092L9.52585 7.23675L10.1092 6.66664H11.6667ZM3.89085 6.66664L4.47419 7.23675L3.89085 7.80686H2.33335V6.66664H3.89085ZM7.00002 9.70533L7.58335 10.2754V11.7976H6.41669V10.2754L7.00002 9.70533ZM8.75002 1.53566H5.25002V4.67126L7.00002 6.38159L8.75002 4.67126V1.53566ZM12.8334 5.52643H9.62502L7.87502 7.23675L9.62502 8.94708H12.8334V5.52643ZM4.37502 5.52643H1.16669V8.94708H4.37502L6.12502 7.23675L4.37502 5.52643ZM7.00002 8.09192L5.25002 9.80224V12.9378H8.75002V9.80224L7.00002 8.09192Z'
                  fill='#7D8085'
                />
              </svg>
              <Link href={"/physical-product-page"}>Digital products</Link>
            </li>
          </ul>
        </div>
        {/* //////////////////////////////////////////////////// */}
        <div className='my-10 flex gap-3 '>
          <svg
            viewBox='0 0 10 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className=' size-6'>
            <path
              d='M7.46579 0.899231H8.91951L5.74379 4.33869L9.47977 9.01862H6.55431L4.26353 6.17999L1.6419 9.01862H0.186751L3.58383 5.34008L0 0.899231H2.9994L5.07073 3.49383L7.46579 0.899231ZM6.95578 8.19405H7.76156L2.56143 1.6805H1.69688L6.95578 8.19405Z'
              fill='#7D8085'
            />
          </svg>
          <svg
            className=' size-6'
            viewBox='0 0 11 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.44186 3.76787V6.59115H4.45075V3.76787H5.44186ZM8.16255 3.76787V6.59115H7.17144V3.76787H8.16255ZM8.16255 8.71256L9.89214 7.06027V1.88778H1.72958V8.71256H3.95828V10.1244L5.44186 8.71256H8.16255ZM10.8832 0.94458V7.5348L7.91655 10.3581H5.68786L4.20428 11.77H2.72069V10.3585H0V2.82467L0.74511 0.94458H10.8832Z'
              fill='#7D8085'
            />
          </svg>
          <svg
            className=' size-6'
            viewBox='0 0 13 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.16185 0.967224C2.7643 0.967224 0 3.5979 0 6.83121C0 10.0645 2.7643 12.6952 6.16185 12.6952C9.5594 12.6952 12.3237 10.0645 12.3237 6.83121C12.3237 3.5979 9.5594 0.967224 6.16185 0.967224ZM6.16185 1.86938C9.03659 1.86938 11.3757 4.09543 11.3757 6.83121C11.3757 9.56698 9.03659 11.793 6.16185 11.793C3.74024 11.793 1.70588 10.2116 1.12193 8.07888L2.85957 8.78707C2.89759 9.11693 3.06206 9.42188 3.32151 9.64357C3.58097 9.86527 3.9172 9.98816 4.2659 9.98874C4.64302 9.98874 5.00471 9.84616 5.27138 9.59239C5.53805 9.33861 5.68786 8.99441 5.68786 8.63551C5.68786 8.62108 5.6836 8.60709 5.68312 8.59311L7.66345 7.27507C8.15136 7.25644 8.61282 7.05903 8.95133 6.7241C9.28984 6.38918 9.47918 5.94268 9.47977 5.47798C9.47977 4.99945 9.28002 4.54052 8.92446 4.20215C8.5689 3.86377 8.08665 3.67368 7.58382 3.67368C7.0956 3.67424 6.62653 3.85447 6.27475 4.17663C5.92296 4.4988 5.71573 4.93795 5.69639 5.4022L4.31045 7.28679C4.29528 7.28634 4.28106 7.28228 4.2659 7.28228C3.95164 7.28228 3.66393 7.38242 3.42788 7.54661L0.963619 6.54117C1.12335 3.94071 3.38997 1.86938 6.16185 1.86938ZM7.58382 4.12475C7.96094 4.12475 8.32263 4.26732 8.5893 4.5211C8.85597 4.77488 9.00578 5.11908 9.00578 5.47798C9.00578 5.83688 8.85597 6.18108 8.5893 6.43486C8.32263 6.68864 7.96094 6.83121 7.58382 6.83121C7.20669 6.83121 6.845 6.68864 6.57833 6.43486C6.31166 6.18108 6.16185 5.83688 6.16185 5.47798C6.16185 5.11908 6.31166 4.77488 6.57833 4.5211C6.845 4.26732 7.20669 4.12475 7.58382 4.12475ZM7.58382 4.57583C7.3324 4.57583 7.09127 4.67088 6.91349 4.84006C6.73571 5.00925 6.63584 5.23871 6.63584 5.47798C6.63584 5.71725 6.73571 5.94671 6.91349 6.1159C7.09127 6.28508 7.3324 6.38013 7.58382 6.38013C7.83523 6.38013 8.07636 6.28508 8.25414 6.1159C8.43192 5.94671 8.53179 5.71725 8.53179 5.47798C8.53179 5.23871 8.43192 5.00925 8.25414 4.84006C8.07636 4.67088 7.83523 4.57583 7.58382 4.57583ZM4.2659 7.73336C4.43628 7.73299 4.60362 7.77633 4.75031 7.85882C4.897 7.94131 5.01762 8.0599 5.09947 8.20211C5.18133 8.34432 5.22139 8.5049 5.21545 8.66695C5.20952 8.829 5.15779 8.98653 5.06573 9.12297C4.97366 9.25941 4.84466 9.36972 4.69229 9.44228C4.53991 9.51484 4.36981 9.54699 4.19986 9.53532C4.02992 9.52366 3.86642 9.46862 3.72656 9.376C3.58671 9.28338 3.47567 9.1566 3.40513 9.009L3.77627 9.16056C3.9496 9.23096 4.14518 9.23313 4.32019 9.16659C4.4952 9.10006 4.63537 8.97024 4.71002 8.80557C4.78418 8.64059 4.78644 8.45434 4.71631 8.28778C4.64618 8.12122 4.50939 7.98799 4.33605 7.9174L3.99098 7.77666C4.07867 7.75095 4.16968 7.73336 4.2659 7.73336Z'
              fill='#7D8085'
            />
          </svg>
          <svg
            className=' size-6'
            viewBox='0 0 12 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.73265 6.4963L7.26932 8.15897C7.83811 8.77469 8.12297 9.08277 8.42111 9.00744C8.71878 8.93256 8.82116 8.5275 9.02545 7.71692L10.1583 3.22059C10.4735 1.97202 10.6308 1.34818 10.281 1.04009C9.93124 0.73201 9.32501 0.961156 8.11254 1.419L2.4882 3.54492C1.51842 3.91164 1.03353 4.09478 1.00272 4.40963C0.999093 4.44171 0.999093 4.47408 1.00272 4.50616C1.03258 4.82146 1.51652 5.00595 2.48536 5.37538C2.9238 5.54273 3.14325 5.62663 3.30062 5.78676C3.31831 5.80481 3.33538 5.82345 3.35181 5.8427C3.49685 6.0141 3.55847 6.23964 3.68218 6.68891L3.91396 7.53107C4.03388 7.96862 4.09407 8.18784 4.25191 8.21761C4.40975 8.24738 4.54673 8.06605 4.82117 7.70293L5.73265 6.4963ZM5.73265 6.4963L5.5824 6.34745C5.41081 6.17694 5.32502 6.09214 5.32502 5.98659C5.32502 5.88104 5.41034 5.79578 5.5824 5.62573L7.27596 3.94592'
              stroke='#7D8085'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <svg
            className=' size-6'
            viewBox='0 0 14 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M5.05082 0.94458L4.68063 0.986981C4.68063 0.986981 3.01978 1.15974 1.80684 2.0867H1.79262L1.77746 2.10023C1.50539 2.3384 1.38689 2.63115 1.19966 3.05922C0.978966 3.57424 0.791085 4.10145 0.63704 4.63798C0.285341 5.84822 0 7.31421 0 8.65526V8.76803L0.0592485 8.8808C0.498162 9.6138 1.2774 10.0807 1.99976 10.4032C2.72164 10.7257 3.34588 10.8967 3.77721 10.9106L4.05876 10.9246L4.20664 10.6851L4.72519 9.81092C5.27501 9.9291 5.90826 10.0085 6.63583 10.0085C7.36341 10.0085 7.99665 9.9291 8.54648 9.81092L9.06502 10.6851L9.21338 10.9246L9.49446 10.9106C9.92579 10.8967 10.55 10.7257 11.2719 10.4032C11.9943 10.0807 12.7735 9.6138 13.2124 8.8808L13.2717 8.76803V8.65526C13.2717 7.31421 12.9863 5.84822 12.6346 4.63798C12.4806 4.10145 12.2927 3.57424 12.072 3.05922C11.8848 2.6307 11.7663 2.3384 11.4942 2.10069L11.4795 2.08625H11.4644C10.2524 1.15974 8.59103 0.986981 8.59103 0.986981L8.22085 0.94458L8.08719 1.2689C8.08719 1.2689 7.9502 1.59819 7.86536 1.97393C7.45787 1.92043 7.04717 1.8921 6.63583 1.88913C6.38225 1.88913 5.94381 1.90492 5.40631 1.97393C5.35025 1.73411 5.27595 1.49848 5.18401 1.2689L5.05082 0.94458ZM4.39908 1.97393C4.41947 2.03708 4.43985 2.09166 4.45833 2.14309C3.84547 2.28743 3.19184 2.50756 2.59224 2.86165L3.09562 3.62307C4.32514 2.89683 6.09122 2.79128 6.63583 2.79128C7.17997 2.79128 8.94653 2.89683 10.1761 3.62307L10.6794 2.86165C10.0798 2.50756 9.4262 2.28743 8.81333 2.14264C8.83182 2.09166 8.8522 2.03708 8.87258 1.97348C9.31481 2.05828 10.1595 2.25225 10.8572 2.7773C10.8534 2.7791 11.0349 3.03982 11.198 3.41151C11.3648 3.79402 11.5497 4.30329 11.7165 4.87751C12.0369 5.97858 12.2886 7.31963 12.309 8.50009C12.0104 8.93358 11.4572 9.32466 10.8719 9.58583C10.5048 9.75092 10.1164 9.86922 9.71676 9.93767L9.47976 9.55741C9.62054 9.50779 9.75942 9.45366 9.87981 9.40224C10.6093 9.09732 11.0055 8.76803 11.0055 8.76803L10.3832 8.09142C10.3832 8.09142 10.1168 8.32417 9.49446 8.58489C8.87306 8.84562 7.92271 9.10634 6.63583 9.10634C5.34896 9.10634 4.39908 8.84562 3.77721 8.58489C3.15486 8.32417 2.88848 8.09142 2.88848 8.09142L2.26614 8.76803C2.26614 8.76803 2.66239 9.09732 3.39186 9.40224C3.51225 9.45366 3.65113 9.50824 3.7919 9.55741L3.55491 9.93812C3.15509 9.86942 2.76654 9.75082 2.39933 9.58538C1.81443 9.32466 1.26081 8.93358 0.963144 8.50009C0.983051 7.31963 1.23474 5.97858 1.55563 4.87751C1.69742 4.37944 1.87042 3.8899 2.0737 3.41151C2.23675 3.03982 2.41829 2.7791 2.4145 2.7773C3.11221 2.25225 3.95685 2.05829 4.39908 1.97393ZM4.97688 5.04666C4.61048 5.04666 4.28627 5.24558 4.08815 5.49773C3.89002 5.74989 3.7919 6.05977 3.7919 6.39988C3.7919 6.74 3.89002 7.04988 4.08815 7.30204C4.28627 7.55419 4.61048 7.75311 4.97688 7.75311C5.34327 7.75311 5.66748 7.55419 5.8656 7.30204C6.06373 7.04988 6.16185 6.74 6.16185 6.39988C6.16185 6.05977 6.06373 5.74989 5.8656 5.49773C5.66748 5.24558 5.34327 5.04666 4.97688 5.04666ZM8.29479 5.04666C7.9284 5.04666 7.60419 5.24558 7.40606 5.49773C7.20794 5.74989 7.10982 6.05977 7.10982 6.39988C7.10982 6.74 7.20794 7.04988 7.40606 7.30204C7.60419 7.55419 7.9284 7.75311 8.29479 7.75311C8.66118 7.75311 8.98539 7.55419 9.18352 7.30204C9.38165 7.04988 9.47976 6.74 9.47976 6.39988C9.47976 6.05977 9.38165 5.74989 9.18352 5.49773C8.98539 5.24558 8.66118 5.04666 8.29479 5.04666ZM4.97688 5.94881C5.00294 5.94881 5.03612 5.95783 5.09537 6.03361C5.15462 6.10894 5.21387 6.24111 5.21387 6.39988C5.21387 6.55866 5.15462 6.69083 5.09537 6.76661C5.03612 6.84194 5.00294 6.85096 4.97688 6.85096C4.95081 6.85096 4.91763 6.84194 4.85838 6.76616C4.77999 6.65868 4.73859 6.53071 4.73988 6.39988C4.73988 6.24111 4.79913 6.10894 4.85838 6.03316C4.91763 5.95783 4.95081 5.94881 4.97688 5.94881ZM8.29479 5.94881C8.32086 5.94881 8.35404 5.95783 8.41329 6.03361C8.47254 6.10894 8.53179 6.24111 8.53179 6.39988C8.53179 6.55866 8.47254 6.69083 8.41329 6.76661C8.35404 6.84194 8.32086 6.85096 8.29479 6.85096C8.26872 6.85096 8.23554 6.84194 8.17629 6.76616C8.09791 6.65868 8.05651 6.53071 8.0578 6.39988C8.0578 6.24111 8.11705 6.10894 8.17629 6.03316C8.23554 5.95783 8.26872 5.94881 8.29479 5.94881Z'
              fill='#7D8085'
            />
          </svg>
        </div>
        {/* /////////////////////////////////////////////////// */}
        <div className='my-10'>
          <ul className='space-y-5 text-[#7D8085]'>
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/help" ? "text-[#BDFD00]" : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='17'
                height='17'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.4646 12.4534C8.71252 12.4534 8.92219 12.3696 9.0936 12.2021C9.26502 12.0346 9.35049 11.8299 9.35002 11.5881C9.34955 11.3462 9.26408 11.1413 9.0936 10.9733C8.92313 10.8053 8.71347 10.7218 8.4646 10.7227C8.21574 10.7236 8.00631 10.8074 7.83631 10.974C7.66631 11.1406 7.5806 11.3453 7.57919 11.5881C7.57777 11.8308 7.66348 12.0357 7.83631 12.2028C8.00915 12.3699 8.21858 12.4534 8.4646 12.4534ZM7.8271 9.78814H9.13752C9.13752 9.40739 9.18191 9.1074 9.27069 8.88818C9.35947 8.66896 9.61021 8.36897 10.0229 7.98822C10.3299 7.68823 10.5719 7.40255 10.749 7.13118C10.9261 6.85981 11.0146 6.53398 11.0146 6.15369C11.0146 5.50756 10.7726 5.01143 10.2886 4.66529C9.80453 4.31916 9.23197 4.14609 8.57085 4.14609C7.89794 4.14609 7.35205 4.31916 6.93319 4.66529C6.51433 5.01143 6.22202 5.4268 6.05627 5.91139L7.22502 6.36137C7.28405 6.15369 7.41698 5.9287 7.62381 5.6864C7.83065 5.44411 8.14633 5.32296 8.57085 5.32296C8.94863 5.32296 9.23197 5.42403 9.42085 5.62617C9.60974 5.82832 9.70419 6.05031 9.70419 6.29214C9.70419 6.5229 9.63335 6.73935 9.49169 6.9415C9.35002 7.14364 9.17294 7.33102 8.96044 7.50363C8.44099 7.95361 8.12224 8.29397 8.00419 8.52473C7.88613 8.75549 7.8271 9.17663 7.8271 9.78814ZM8.50002 15.2225C7.52016 15.2225 6.59933 15.0409 5.73752 14.6777C4.87572 14.3145 4.12606 13.8211 3.48856 13.1976C2.85106 12.5741 2.34649 11.8414 1.97485 10.9996C1.60322 10.1578 1.41716 9.25785 1.41669 8.29974C1.41622 7.34163 1.60227 6.44168 1.97485 5.59987C2.34744 4.75806 2.85201 4.0254 3.48856 3.40189C4.12512 2.77838 4.87477 2.28525 5.73752 1.9225C6.60027 1.55974 7.5211 1.37791 8.50002 1.37698C9.47894 1.37606 10.3998 1.5579 11.2625 1.9225C12.1253 2.2871 12.8749 2.78023 13.5115 3.40189C14.148 4.02355 14.6528 4.75621 15.0259 5.59987C15.399 6.44352 15.5848 7.34348 15.5834 8.29974C15.5819 9.25601 15.3959 10.156 15.0252 10.9996C14.6545 11.8433 14.1499 12.5759 13.5115 13.1976C12.873 13.8193 12.1234 14.3126 11.2625 14.6777C10.4017 15.0427 9.48083 15.2244 8.50002 15.2225ZM8.50002 13.838C10.082 13.838 11.4219 13.3014 12.5198 12.2284C13.6177 11.1554 14.1667 9.84583 14.1667 8.29974C14.1667 6.75366 13.6177 5.44411 12.5198 4.37108C11.4219 3.29805 10.082 2.76154 8.50002 2.76154C6.91808 2.76154 5.57815 3.29805 4.48023 4.37108C3.38231 5.44411 2.83335 6.75366 2.83335 8.29974C2.83335 9.84583 3.38231 11.1554 4.48023 12.2284C5.57815 13.3014 6.91808 13.838 8.50002 13.838Z'
                  fill='#7D8085'
                />
              </svg>

              <Link href={"/"}>Help</Link>
            </li>
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/conditions" ? "text-[#BDFD00]" : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7 3.8119V3.80524'
                  stroke='#7D8085'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7 10.3207V5.75989'
                  stroke='#7D8085'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M7 12.9269C10.3137 12.9269 13 10.3016 13 7.06296C13 3.82437 10.3137 1.19897 7 1.19897C3.68629 1.19897 1 3.82437 1 7.06296C1 10.3016 3.68629 12.9269 7 12.9269Z'
                  stroke='#7D8085'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <Link href={"/"}>Conditions</Link>
            </li>
            <li
              className={`text-sm flex items-center gap-3 ${
                pageAddress === "/con" ? "text-[#BDFD00]" : "hover:text-[#BDFD00]"
              }  `}>
              <svg
                width='15'
                height='16'
                viewBox='0 0 15 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M4.375 10.9484C4.55208 10.9484 4.70062 10.8897 4.82062 10.7724C4.94062 10.6552 5.00042 10.5102 5 10.3375C4.99958 10.1649 4.93958 10.0199 4.82 9.90261C4.70042 9.78533 4.55208 9.72669 4.375 9.72669C4.19792 9.72669 4.04958 9.78533 3.93 9.90261C3.81042 10.0199 3.75042 10.1649 3.75 10.3375C3.74958 10.5102 3.80958 10.6554 3.93 10.773C4.05042 10.8907 4.19875 10.9492 4.375 10.9484ZM3.75 8.50503H5V4.84003H3.75V8.50503ZM6.875 10.9484H11.25V9.72669H6.875V10.9484ZM6.875 8.50503H11.25V7.28336H6.875V8.50503ZM6.875 6.0617H11.25V4.84003H6.875V6.0617ZM2.5 13.3917C2.15625 13.3917 1.86208 13.2722 1.6175 13.0331C1.37292 12.7941 1.25042 12.5064 1.25 12.17V3.61837C1.25 3.28241 1.3725 2.99491 1.6175 2.75588C1.8625 2.51684 2.15667 2.39711 2.5 2.39671H12.5C12.8438 2.39671 13.1381 2.51643 13.3831 2.75588C13.6281 2.99532 13.7504 3.28282 13.75 3.61837V12.17C13.75 12.506 13.6277 12.7937 13.3831 13.0331C13.1385 13.2726 12.8442 13.3921 12.5 13.3917H2.5ZM2.5 12.17H12.5V3.61837H2.5V12.17Z'
                  fill='#7D8085'
                />
              </svg>
              <Link href={"/"}>Confidentiality</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
