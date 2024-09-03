"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import img from "/public/Mobile.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addUser } from "@/redux/slices/loginSlice";
import { toast } from "react-toastify";

const Login = () => {

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
    <div className="flex  flex-col items-center justify-center min-h-screen py-2 px-4">
      <main className="flex flex-col items-center justify-center   flex-1 px-10  text-center">
        <div className="bg-white rounded-bl-2xl shadow-2xl flex  md:max-w-4xl max-w-xl m-2 p-5">
          <div className="lg:w-3/5 p-2 md:p-10">
            <div>
              <h3 className="text-xl text-left sm:text-2xl font-semibold mb-4">
                Hello, Welcome Back
              </h3>
              <form>
                <p className="text-gray-600 text-sm text-left mb-4 ">
                  Glad to see you again. Login to your account below
                </p>
                <div className="mb-10">
                  <label
                    htmlFor="mailid"
                    className="block text-left text-gray-700 text-sm sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="mailid"
                    placeholder="name@example.com"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none"
                    required
                  />
                </div>
                {show ? (
                  <div className="mb-4">
                    <label
                      htmlFor="otp"
                      className="block text-left text-gray-700 text-sm sm:text-base"
                    >
                      OTP
                    </label>
                    <input
                      type="tel"
                      id="otp"
                      placeholder="OTP"
                      className="mt-1  block w-full p-2 border border-gray-300 rounded-md outline-none"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className={`mt-4 py-1 text-sm px-2 rounded-md font-semibold border-2 transition-all duration-300 ${
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
                      className="text-[#70BF29] text-sm cursor-pointer hover:text-[#70BF01]"
                    >
                      Get OTP
                    </p>
                    <div className="text-gray-600 mt-2">
                      Don't have an account?
                      <Link href="/signup">
                        <p className="text-[#70BF29] ml-2 text-sm">Sign Up</p>
                      </Link>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="w-2/5 hidden lg:block bg-green-500 text-white rounded-tr-2xl">
            <Image
              alt=""
              src="/blue-curved.jpg"
              width={100}
              height={100}
              className="w-full h-full rounded-tr-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
