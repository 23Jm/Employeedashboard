"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { role } from "@/lib/data";
import { FaDotCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

import { useDispatch } from "react-redux";
const Navbar = () => {
   const [name, setName] = useState("");
   const [open, setOpen] = useState("");
   const router = useRouter();
   const [isLate, setIsLate] = useState(false);
   const dispatch=useDispatch();
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
     const now = new Date();
     const hours = now.getHours();
     const minutes = now.getMinutes();
     if (hours > 14 || (hours === 14 && minutes >= 30)) {
       setIsLate(true);
     }
   }, []);
   const handleLogout = async () => {
     const token = localStorage.getItem("token");
     console.log(token);
     try {
       await axios.put(
         "http://192.168.29.240:8000/api/v1/user/logoutTime",
         {},
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       toast.success("Successfully logged out");
       router.push("/");
     } catch (error) {
       toast.warning("Already logged out");
       router.push("/");
     }
   };
   const handleLogoutDefault=async()=>{
     router.push("/");
   }
  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex  items-center justify-between px-4 py-3 bg-white">
        {/* searchbar */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
          <Image src="/search.png" alt="" width={14} height={14} />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none"
          />
        </div>
        {/* icons and user */}
        <div className="flex items-center gap-4 w-full justify-end">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/message.png" alt="" width={20} height={20} />
          </div>
          <div className="bg-white relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/announcement.png" alt="" width={20} height={20} />
            <div className="absolute rounded-full text-xs -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-hurryGreen text-white">
              <span>1</span>
            </div>
          </div>
          <div className="flex flex-col pt-2">
            <span className="text-xs leading-3 font-medium">{name} Raj</span>
            <span className="text-[10px] text-gray-500 text-right pt-1">
              {role=="admin"?"Admin":"Employee"}
            </span>
          </div>
          <Link href="/list/profile">
            <Image
              src="/raj.jpg"
              alt=""
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>
          <div className="me-2">
            <button
              type="button"
              className="inline-flex w-full  rounded-full justify-center gap-x-1  p-1 text-sm font-semibold text-gray-500 shadow-sm  hover:bg-gray-100 hover:text-white" //ring-1 ring-inset ring-gray-300
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setOpen(open === "close" ? "open" : "close")}
            >
              <IoIosArrowDown className="text-gray-500  w-3 h-3" />
            </button>
          </div>
          {open === "open" && (
            <div
              className="absolute top-14 right-6 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="py-1" role="none">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                >
                  Settings
                </a>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-3"
                    onClick={handleLogoutDefault}
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="relative  flex items-center space-x-1">
          {isLate && (
            <button
              className={`text-white font-bold text-2xl ring-1 ring-red-600 rounded-full hover:bg-slate-900 inline-flex ${
                isLate ? "animate-lateBlink" : ""
              }`}
              onClick={handleLogout}
            >
              <FaDotCircle className="" size={16} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;