"use client";

import store from "../redux/store/store";
import img from "../../public/Office.png";
import Image from "next/image";
import { Provider } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addUser } from "@/redux/slices/loginSlice";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
export default function Home() {
      const dispatch = useDispatch();
      const [show, setShow] = useState(false);
      const [open, setOpen] = useState(false);
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
    <Provider store={store}>
      <nav className="bg-black text-white px-2 py-2 fixed inset-x-0">
        <div className="flex justify-between mx-4 py-2">
          <Link href="/">
            <h1 className="text-xl font-bold">Hurryep</h1>
          </Link>
          <div>
            <a
              className="text-lg font-bold cursor-pointer"
              onClick={() => setOpen(true)}
            >
              login
            </a>
          </div>
        </div>
      </nav>

      <div>
        <div className="bg-white flex justify-center items-center w-full h-screen">
          <div className="p-5 rounded text-center">
            <Image src={img} alt="img" className="w-[500px] h-[500px]" />
          </div>
        </div>
        <div>
          {open && (
            <div className="fixed inset-0 z-50  bg-black bg-opacity-50 flex w-full flex-col items-center justify-center min-h-screen py-2">
              <main className="flex m-2  flex-col items-center justify-center  flex-1 md:px-20 text-center">
                <div className="bg-white  rounded-bl-3xl rounded-tr-3xl m shadow-2xl h-[400px]  flex w-full max-w-4xl">
                  <div className="lg:w-3/5 relative w-full h-full p-10">
                    <div
                      className="absolute top-4 right-4 z-40"
                      onClick={() => setOpen(false)}
                    >
                      <MdCancel className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl text-left sm:text-2xl font-semibold mb-4">
                        Hello, Welcome Back
                      </h3>
                      <form>
                        <p className="text-gray-600 text-sm text-left mb-4 ">
                          Glad to see you again. Login to your account below
                        </p>
                        <div className=" mb-4">
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
                          <div className="text-right mt-24">
                            <p
                              onClick={handleShow}
                              className="text-[#70BF29] text-sm cursor-pointer hover:text-[#70BF01]"
                            >
                              Get OTP
                            </p>
                            <div className="text-gray-600 mt-2">
                              Don't have an account?
                              <Link href="/signup">
                                <p className="text-[#70BF29] ml-2 mt-2 text-sm">
                                  Sign Up
                                </p>
                              </Link>
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                  <div className="w-2/5 hidden lg:block bg-green-500 text-white rounded-tr-3xl">
                    <Image
                      alt=""
                      src="/bg-black.jpg"
                      width={100}
                      height={100}
                      className="w-full h-full rounded-tr-3xl"
                    />
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      </div>
    </Provider>
  );
}
