"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    salary: 4000,
    bonus: 2400,
  },
  {
    name: "Feb",
    salary: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    salary: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    salary: 2780,
    expense: 3908,
  },
  {
    name: "May",
    salary: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    salary: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    salary: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    salary: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    salary: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    salary: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    salary: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    salary: 3490,
    expense: 4300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="salary"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#CFCEFF"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
