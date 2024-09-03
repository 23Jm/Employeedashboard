import Image from "next/image";
import React from "react";

const UserCards = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl min-w-[130px] bg-white shadow-md p-4  flex-1">
        <div className="flex justify-between items-center">
            <span className="text-[10px]  bg-[#70bf29] px-2 py-[0.5]  rounded-full  text-white">2024/25</span>
            <Image src="/more.png" alt="" width={20} height={20}/>
        </div>
        <h1 className="text-2xl font-semibold my-4">1,234</h1>
        <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCards;
