import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      <div
        className="bg-hurryGreen h-4 rounded-full  transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute right-0 top-0 text-xs font-semibold pr-4">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;
