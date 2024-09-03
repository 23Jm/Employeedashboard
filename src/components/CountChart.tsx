"use client"
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Completed",
    count: 55,
    fill: "#70bf29",
  },
  {
    name: "InComplete",
    count: 50,
    fill: "#CFCEFF",
  },
];

export const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 shadow-md">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Tasks</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* chart */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/hourglass.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* bottom */}
      <div className="flex justify-center gap-16 lg:gap-10 xl:gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-hurryGreen rounded-full text-center"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Completed (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-Purple rounded-full text-center"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Ongoing (45%)</h2>
        </div>
      </div>
    </div>
  );
}

