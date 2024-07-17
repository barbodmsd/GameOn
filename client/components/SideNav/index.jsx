import React from "react";

export default function SidNav() {
  return (
    <div className="sidenav h-screen w-60 px-16 bg-[#191919]">
      <div className="logo my-6">
        <h1 className=" text-2xl font-bold">GameOn</h1>
      </div>
      <div className="bu">
        <button className="bg-[#BDFD00] w-24 h-8 text-black rounded-2xl translate-x-0 hover:bg-[#8eb41b] transition-all text-xs font-bold my-5 ">
          go to home
        </button>
      </div>
      <div>
        <ul class=" space-y-3 ">
          <li class="text-lg text-gray-800">Item 1</li>
          <li class="text-lg text-gray-800">Item 2</li>
          <li class="text-lg text-gray-800">Item 3</li>
          <li class="text-lg text-gray-800">Item 4</li>
        </ul>
      </div>
    </div>
  );
}
