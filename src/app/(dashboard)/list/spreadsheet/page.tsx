"use client";
import React, { useState, useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
import * as XLSX from "xlsx";
import axios from "axios";

export default function SpreadsheetComponent() {
  const [data, setData] = useState([[{ value: "" }], [{ value: "" }]]);
  const [updatedRows, setUpdatedRows] = useState({});
  const [canDownload,setCanDownload]=useState(false);
  const columnLabels = [
    "date",
    "client",
    "assignee",
    "task",
    "details",
    "status",
  ];

  const rowLabels = data.map((_, index) => (index + 1).toString());
 const getDaysInMonth=()=>{
  const today=new Date();
   return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
 }
 const daysInMonth=getDaysInMonth();
 const transformData = (apiData) => {
   return apiData.map((item) =>
     columnLabels.map((label) => ({ value: item[label] || "" }))
   );
 };
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    try {
      const response = await axios.get(
        "http://192.168.29.240:8000/api/v1/getSpreadsheet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    const result = response.data;
    // console.log("Data fetched from API:", result); 
    if(result.length===daysInMonth){
      setCanDownload(true);
      sendEmailNotification();
    }
    const transformedData = transformData(result);
    setData(transformedData);
    console.log(result);
    

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveRowData = async (rowIndex) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }

    const rowToSave = columnLabels.reduce((acc, label, colIndex) => {
      acc[label] = data[rowIndex][colIndex].value;
      return acc;
    }, {});

    try {
      const response = await axios.post(
        "http://192.168.29.240:8000/api/v1/addSpreadsheet",
        rowToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert(response.data)
      if (data.length + 1 === daysInMonth) {
        setCanDownload(true);
        sendEmailNotification();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data:", error);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  const handleDataChange = (updatedData) => {
    setData(updatedData);

    updatedData.forEach((row, rowIndex) => {
      if (!updatedRows[rowIndex]) {
        setUpdatedRows((prevRows) => ({
          ...prevRows,
          [rowIndex]: true,
        }));
      }
    });
  };

  const handleRowSave = (rowIndex) => {
    if (updatedRows[rowIndex]) {
      saveRowData(rowIndex);
      setUpdatedRows((prevRows) => {
        const updated = { ...prevRows };
        delete updated[rowIndex];
        return updated;
      });
    }
  };



  const downloadSpreadsheet = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((row) => row.map((cell) => cell.value))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "spreadsheet.xlsx");
  };
 const sendEmailNotification=async()=>{
  try{
       const response = await axios.post(
         "http://192.168.29.240:8000/api/v1/sendRemainder",
         {
           to: "jannathmarha23@gmail.com",
           subject: "Spreadsheet Ready for Download",
           message:
             "The spreadsheet is ready for download. Please download it now.",
         },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       console.log("Email sent:", response.data);
  }
  catch(error)
  {
   console.error("Error sending email:", error);
  }
 }
 
  const currentYear = new Date().getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonthName = monthNames[new Date().getMonth()];
  return (
    <>
        <main className="pb-4 h-[1200px]">
          <div className="p-4">
            <div className="p-4 bg-white h-[600px]">
              <h2 className="mb-4">Team Day Sheet - {currentMonthName} {currentYear} </h2>

              <button
                onClick={downloadSpreadsheet}
                disabled={!canDownload}
                className={` mb-4 py-1 px-4 rounded-md font-bold border-2 duration-300 transition-all ${
                  canDownload
                    ? "bg-blue-500 text-white border-blue-500 hover:bg-transparent hover:text-blue-500"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                Download Spreadsheet
              </button>
              <div className="overflow-auto">
                <Spreadsheet
                  data={data}
                  columnLabels={columnLabels}
                  rowLabels={rowLabels}
                  onChange={handleDataChange}
                />
              </div>
            </div>
          </div>
        </main>
    </>
  );
}
