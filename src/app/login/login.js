"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import img from "/public/Mobile.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addUser } from "@/redux/slices/loginSlice";
import { toast, ToastContainer,Slide } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleShow = async () => {
    setShow(!show);
    const mail = document.getElementById("mailid").value;
    const data = new FormData();
    data.append("userEmail", mail);
    try {
      const sendOtp = await axios.post(
        "http://192.168.29.240:8000/api/v1/user/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(sendOtp);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    setShow(!show);
    setLoading(true);
    const mail = document.getElementById("mailid").value;
    const otp = document.getElementById("otp").value;
    const data = { otp, userEmail: mail };
    try {
      const sendOtp = await axios.post(
        "http://192.168.29.240:8000/api/v1/user/verifyOtp",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addUser(sendOtp.data.user));
      console.log(sendOtp);
      const cookieValue = sendOtp.data.token;
      if (cookieValue) {
        localStorage.setItem("token", cookieValue);
      }
      router.push("/employees");
      const hours = new Date("2024-08-22T09:30:00").getHours();
      const mins = new Date("2024-08-22T09:30:00").getMinutes();
      if (hours >= 9 && mins >= 30) {
        toast.warning("Please Login Before 9.30AM");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex mx-auto rounded-lg  m-2 md:w-[600px] justify-center  items-center h-full  p-4 sm:p-6 md:p-0">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Slide}
        draggable
        pauseOnHover
      />
      <div className="p-6 m-2 w-full md:w-1/2">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Hello, Welcome Back
        </h3>
        <form>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Glad to see you again. Login to your account below
          </p>
          <div className="mb-4">
            <label
              htmlFor="mailid"
              className="block text-gray-700 text-sm sm:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="mailid"
              placeholder="name@example.com"
              className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          {show ? (
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-gray-700 text-sm sm:text-base"
              >
                OTP
              </label>
              <input
                type="tel"
                id="otp"
                placeholder="OTP"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-md outline-none"
              />
              <button
                type="button"
                onClick={verifyOtp}
                className={`mt-4 py-2 px-4 rounded-md font-bold border-2 transition-all duration-300 ${
                  loading
                    ? "bg-gray-500 text-white border-gray-500 cursor-not-allowed"
                    : "bg-[#70BF29] text-white border-[#70BF29] hover:bg-transparent hover:text-[#70BF35]"
                }`}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          ) : (
            <div className="text-right">
              <p
                onClick={handleShow}
                className="text-[#70BF29] cursor-pointer hover:text-[#70BF01]"
              >
                Get OTP
              </p>
              <div className="text-gray-600 mt-2">
                Don't have an account?
                <Link href="/signup">
                  <p className="text-[#70BF29] ml-2">Sign Up</p>
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="md:w-1/2 h-full hidden md:block">
        <Image alt="" src={img} className="w-full h-full" />
      </div>
      <ToastContainer
      />
    </div>
  );
}
