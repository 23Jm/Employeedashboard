"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowUpCircleOutline, IoPersonCircleOutline, IoPersonCircleSharp, IoSunny, IoToday } from "react-icons/io5";
import Modal from "react-modal";
import Requestleave from "./RequestLeave";
import { MdOutlineAssignmentLate, MdOutlineCancel } from "react-icons/md";
import AttendanceChart from "@/components/AttendanceChart";
import ViewAttendane from "./ViewAttendance";

const AttendancePage = () => {
  const [available, setAvailable] = useState();
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();
  const now = new Date("2024/08/20");
  const hour = now.getHours();
  const day = now.getDay();
  const mintues = now.getMinutes();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewIsOpen, setViewisOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const operAttendance = () => setViewisOpen(true);
  const closeAttendance = () => setViewisOpen(false);
  useEffect(() => {
    const appElement = document.getElementById("root"); // Replace 'root' with your actual root element ID
    if (appElement) {
      Modal.setAppElement(appElement);
    } else {
      console.error("Root element not found");
    }
  }, []);
  if (hour >= 9 && hour >= 11 && mintues >= 30) {
    console.log(now);
  }
  console.log(hour);
  const token = localStorage.getItem("token");
  useEffect(() => {
    AttendanceAnalyze();
  }, []);
  const AttendanceAnalyze = async () => {
    try {
      const getResponse = await axios.get(
        `http://192.168.29.240:8000/api/v1/user/attendenceAnalysis`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setAvailable(getResponse.data);
    } catch (error) {}
  };
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button
          className="bg-hurryGreen  font-medium text-white md:text-sm text-[12px] p-2 my-4 rounded-md inline-block"
          onClick={openModal}
        >
          Requested Leave
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-white  rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-3/12"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          {/* <button
            onClick={closeModal}
            className="text-white px-3 py-3 rounded-full mb-44 ml-20 absolute right-0"
          >
            <MdOutlineCancel size={25} className="text-blue-900" />
          </button> */}
          <Requestleave closeModal={closeModal} />
        </Modal>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        {/* left */}
        <div className="w-full flex flex-col gap-8">
          {/* usercards */}
          <div className="flex gap-4 justify-between flex-wrap">
            <div className="rounded-2xl min-w-[130px] bg-white shadow-md p-4  flex-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px]  text-hurryGreen px-2 py-[0.5]  rounded-full  font-bold">
                  {time}
                </span>
                <IoSunny size={30} className="text-Yellow" />
              </div>
              <h1 className="text-2xl font-semibold my-4">Today:</h1>
              <h2 className="capitalize text-sm font-medium text-gray-500">
                {date}
              </h2>
              <button
                className=" text-hurryGreen font-bold md:text-sm text-[12px]  mt-2 rounded-md inline-block"
                onClick={operAttendance}
              >
                View Attendance
              </button>
              <Modal
                isOpen={viewIsOpen}
                onRequestClose={closeAttendance}
                contentLabel="Example Modal"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-9/12"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
              >
                <button
                  onClick={closeAttendance}
                  className="text-white bg-white px-3 py-3 rounded-full mb-44 ml-20 absolute -top-5 -right-10"
                  size={30}
                >
                  <MdOutlineCancel size={45} className="text-blue-900" />
                </button>
                <ViewAttendane />
              </Modal>
            </div>
            <div className="rounded-2xl min-w-[130px] bg-white shadow-md p-4  flex-1">
              <div className="flex justify-between items-center">
                <IoPersonCircleSharp size={30} className="text-Yellow" />
              </div>
              <h1 className="text-xl font-semibold my-4">
                No of Present:
                <h2 className="capitalize py-1 font-medium text-hurryGreen">
                  {" "}
                  {available?.present}
                </h2>
              </h1>
            </div>
            <div className="rounded-2xl min-w-[130px] bg-white shadow-md p-4  flex-1">
              <div className="flex justify-between items-center">
                <IoPersonCircleOutline size={30} className="text-Yellow" />
              </div>
              <h1 className="text-xl font-semibold my-4">
                No of Absent:{" "}
                <h2 className="capitalize py-1 font-medium text-hurryGreen">
                  {available?.absent}
                </h2>
              </h1>
            </div>
            {/* <div className="rounded-2xl min-w-[130px] bg-white shadow-md p-4  flex-1">
              <div className="flex justify-between items-center">
                <MdOutlineAssignmentLate size={30} className="text-Yellow" />
              </div>
              <h1 className="text-xl font-semibold my-4">
                {" "}
                No of Late:{" "}
                <h2 className="capitalize py-1 font-medium text-hurryGreen">
                  {available?.late}
                </h2>
              </h1>
            </div> */}
            <div className="rounded-2xl min-w-[130px] bg-white shadow-md p-4  flex-1">
              <div className="flex justify-between items-center">
                <IoToday size={30} className="text-Yellow" />
              </div>
              <h1 className="text-xl font-semibold my-4">
                No of Halfday:{" "}
                <h2 className="capitalize py-1 font-medium text-hurryGreen">
                  {available?.halfDay}
                </h2>
              </h1>
            </div>
          </div>
          {/* middle charts */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* attendance chart */}
            <div className="w-full h-[450px]">
              <AttendanceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
