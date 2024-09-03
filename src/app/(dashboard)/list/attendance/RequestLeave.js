import React from "react";

const Requestleave = ({closeModal}) => {
  function handleSubmit(){
    console.log("submitted");
  }
  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center m-2">
        <div className="bg-white rounded-lg p-4 w-full">
          <h2 className="text-lg font-semibold mb-4">Request For Leave</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-500">Type</label>
              <select
                name="status"
                className="border border-gray-300 rounded p-2 w-48"
              >
                <option value="" disabled selected>
                  Select a leave Type
                </option>
                <option value="Casual laeve">Casual Leave</option>
                <option value="Sick Leave">Sick leave</option>
              </select>{" "}
            </div>
            <div className="mb-4">
              <label className="block text-gray-500">Start Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500">End Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-500 block">Reason</label>
              <textarea
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-hurryGreen text-white font-medium px-4 py-2 rounded-md"
              >
                Done
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-400 text-white font-medium px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Requestleave;
