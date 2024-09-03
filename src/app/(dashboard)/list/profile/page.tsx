"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import girl from "../../../../../public/raj.jpg";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import html5 from "../../../../../public/html5.png"
import css from "../../../../../public/css3.png"
import bootstrap from "../../../../../public/bootstrap5.png"
import redux from "../../../../../public/redux.png"
import sass from "../../../../../public/sass.png"
import js from "../../../../../public//js.png"
import tailwind from "../../../../../public/tailwindcss.png"
import material from "../../../../../public/materialui.png"
import react from "../../../../../public/reactjs.png"
import nextjs from "../../../../../public/nextjs2.png"
import github from "../../../../../public/github.png"
import figma from "../../../../../public/figma.png"
import ProgressBar from "../../../../components/ProgressBar/ProgressBar"
import Link from "next/link";
import Announcements from "@/components/Announcements";
export default function Profile(){

 const [name, setName] = useState("");

 useEffect(() => {
   const fetchUserInfo = async () => {
     try {
       const token = localStorage.getItem("token");
       if (!token) {
         console.log("No token found in localStorage");
         return;
       }

       const response = await axios.get(
         "http://192.168.29.240:8000/api/v1/user/viewProfile",
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       setName(response.data.user.userName);
     } catch (error) {
       console.log(error);
     }
   };

   fetchUserInfo();
 }, []); 
 const techStacks = [
   { name: "HTML", logo: html5 },
   { name: "CSS", logo: css },
   { name: "JS", logo: js },
   { name: "React", logo: react },
   { name: "Next.js", logo: nextjs },
   { name: "Tailwind CSS", logo: tailwind },
   { name: "Material Ui", logo: material },
   { name: "bs", logo: bootstrap },
   { name: "redux", logo: redux },
   { name: "sass", logo: sass },
   { name: "figma", logo: figma },
   { name: "github", logo: github },
 ];
    return (
      <>
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row ">
          {/* LEFT */}
          <div className="w-full xl:w-2/3 ">
            {/* TOP */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* USER INFO CARD */}
              <div className="bg-white shadow-md py-6 px-4 rounded-md flex-1 flex gap-4">
                <div className="w-1/3">
                  <Image
                    src="/raj.jpg"
                    alt=""
                    width={144}
                    height={144}
                    className="w-36 h-36 rounded-full object-cover"
                  />
                </div>
                <div className="w-2/3 flex flex-col justify-between gap-2">
                  <h1 className="text-xl font-semibold">Raj Kumar</h1>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src="/blood.png" alt="" width={14} height={14} />
                      <span>A+</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src="/date.png" alt="" width={14} height={14} />
                      <span>January 2025</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src="/mail.png" alt="" width={14} height={14} />
                      <span>user@gmail.com</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src="/phone.png" alt="" width={14} height={14} />
                      <span>+1 234 567</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* SMALL CARDS */}
              <div className="flex-1 flex gap-4 justify-between flex-wrap">
                {/* CARD */}
                <div className="bg-white shadow-md p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                  <Image
                    src="/singleAttendance.png"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="">
                    <h1 className="text-xl font-semibold">90%</h1>
                    <span className="text-sm text-gray-400">Attendance</span>
                  </div>
                </div>
                {/* CARD */}
                <div className="bg-white shadow-md p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                  <Image
                    src="/singleBranch.png"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="">
                    <h1 className="text-xl font-semibold">+3</h1>
                    <span className="text-sm text-gray-400">Projects</span>
                  </div>
                </div>
                {/* CARD */}
                <div className="bg-white shadow-md p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                  <Image
                    src="/singleLesson.png"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="">
                    <h1 className="text-xl font-semibold">3</h1>
                    <span className="text-sm text-gray-400">Interns</span>
                  </div>
                </div>
                {/* CARD */}
                <div className="bg-white shadow-md p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                  <Image
                    src="/singleClass.png"
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <div className="">
                    <h1 className="text-xl font-semibold">2</h1>
                    <span className="text-sm text-gray-400">Tasks</span>
                  </div>
                </div>
              </div>
            </div>
            {/* BOTTOM */}
            <div className="mt-4 bg-white rounded-md p-4 h-fit shadow-md">
              <div>
                <h1 className="text-lg font-semibold">About me</h1>
                <p className="text-sm w-full p-4 my-4 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo quae sit cum repellat rem itaque nihil, magni quidem
                  ab iste perferendis, eum rerum voluptates. Recusandae
                  doloremque vero eveniet maxime temporibus! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Magni sequi aut
                  voluptates molestiae suscipit eveniet natus animi atque sit
                  officia!
                </p>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Tech stacks</h1>
                <div className="p-4 my-4 border border-gray-100 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {techStacks.map((tech, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={50}
                        height={50}
                        className="mb-2 w-ful h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Follow me</h1>
                <div className="flex p-4 items-center my-4">
                  <TiSocialLinkedin
                    size={30}
                    className="text-hurryGreen me-4"
                  />
                  <TiSocialFacebook
                    size={30}
                    className="text-hurryGreen me-4"
                  />
                  <FaSquareXTwitter
                    size={30}
                    className="text-hurryGreen me-4"
                  />
                  <FaInstagramSquare
                    size={30}
                    className="text-hurryGreen me-4"
                  />
                  <FaGithub size={30} className="text-hurryGreen" />
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full xl:w-1/3 flex flex-col gap-4 ">
            <div className="bg-white p-4 rounded-md  shadow-md">
              <h1 className="text-lg font-semibold">Proficiency</h1>
              <div className="mt-4 flex gap-4 flex-col text-xs text-gray-500">
                <div className="text-start">
                  <h2 className="my-3 text-lg">Design</h2>
                  <ProgressBar progress={70} />
                </div>
                <div className="text-start">
                  <h2 className="my-3 text-lg">Frontend</h2>
                  <ProgressBar progress={90} />
                </div>
                <div className="text-start">
                  <h2 className="my-3 text-lg">Backend</h2>
                  <ProgressBar progress={100} />
                </div>
              </div>
            </div>
            <div className="">
              <Announcements />
            </div>
          </div>
        </div>
      </>
    );
}