import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { IoFilterOutline } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { WiMoonFull } from "react-icons/wi";
const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [active, setActive] = useState("All");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of items per page
  useEffect(() => {
    fetchData(active);
  }, [active]);
  const menuItems = ["All", "Present", "Absent", "HalfDay"];
  const token = localStorage.getItem("token");
  const fetchData = async (statusFilter = "All") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://192.168.29.240:8000/api/v1/user/getAttendenceDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filterData = response.data.details.filter(
        (user) => statusFilter === "All" || user.status === statusFilter
      );
      setAttendance(filterData);
      setCurrentPage(0); // Reset to first page on new filter
    } catch (error) {
      setError("Error fetching attendance data. Please try again later.");
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const startIndex = currentPage * itemsPerPage;
  const selectedItems = attendance.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="my-3 border col-span-3 bg-gray-200 w-full rounded-lg">
          <ul className="flex sm:gap-2  lg:gap-1 xl:gap-20 py-2 px-2 ">
            {menuItems.map((item) => (
              <li
                key={item}
                className={`px-4 py-2 rounded inline text-md cursor-pointer ${
                  active === item
                    ? "bg-white text-slate-900"
                    : "text-gray-500 hover:bg-white hover:text-slate-900"
                }`}
                onClick={() => setActive(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-3 p-2 inline-flex justify-end md:mt-2 gap-4">
          <IoFilterOutline
            className="border border-gray-200 rounded p-1  cursor-pointer "
            size={30}
          />
          <BiSortAlt2
            className="border border-gray-200 rounded p-1  cursor-pointer "
            size={30}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : attendance.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No records found</div>
      ) : (
        <>
          <table className="w-full">
            <thead className="border border-gray-300">
              <tr className="bg-hurryGreen font-sans-serif ">
                <th className="text-white font-medium text-lg py-2">Date</th>
                <th className="text-white font-medium text-lg py-2">Log-in</th>
                <th className="text-white font-medium text-lg py-2">Log-out</th>
                <th className="text-white font-medium text-lg py-2">Status</th>
              </tr>
            </thead>
            <tbody className="border border-gray-200">
              {selectedItems.map((user) => (
                <tr key={user.date} className="border border-gray-200">
                  <td className="text-gray-500 text-center py-2 border border-gray-200">
                    {moment(user.date).format("YYYY-MM-DD")}
                  </td>
                  <td className="text-gray-500 text-center border border-gray-200">
                    {user.loginTime
                      ? moment(user.loginTime).format("LTS")
                      : "--"}
                  </td>
                  <td className="text-gray-500 text-center border border-gray-200">
                    {user.loginTime
                      ? user.logoutTime
                        ? moment(user.logoutTime).format("LTS")
                        : "Not logged out"
                      : "--"}
                  </td>
                  <td className="text-center border border-gray-200">
                    <h1
                      className={`inline-flex items-center rounded-full text-sm px-3 py-1 w-24 mx-auto ${
                        user.status === "Absent"
                          ? "text-red-500 bg-red-100 border border-red-500"
                          : user.status === "Present"
                          ? "text-green-500 bg-green-100 border border-green-500"
                          : user.status === "HalfDay"
                          ? "text-yellow-500 bg-yellow-100 border border-yellow-500"
                          : "text-gray-500 bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {user.status ? <WiMoonFull className="mr-1" /> : null}
                      {user.status || "Pending"}
                    </h1>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex  justify-center my-4">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={Math.ceil(attendance.length / itemsPerPage)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"pagination flex gap-1"}
              activeClassName={"active"}
              pageClassName={"px-2 py-1 border border-gray-300 rounded"}
              previousClassName={"px-2 py-1 border border-gray-300 rounded"}
              nextClassName={"px-2 py-1 border border-gray-300 rounded"}
              activeLinkClassName={"bg-blue-500 rounded p-1 text-white"}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ViewAttendance;
