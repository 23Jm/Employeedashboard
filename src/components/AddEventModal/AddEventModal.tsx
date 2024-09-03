import React, { useState, useEffect } from "react";

const AddEventModal = ({
  isOpen,
  setOpen,
  onAddEvent,
  onDeleteEvent,
  selectedDate,
  selectedEvent,
}) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent._def.title || "");
      setStartDate(
        new Date(selectedEvent._instance.range.start)
          .toISOString()
          .split("T")[0]
      );
      setEndDate(
        new Date(selectedEvent._instance.range.end).toISOString().split("T")[0]
      );
    } else if (selectedDate) {
      setTitle("");
      setStartDate(selectedDate.toISOString().split("T")[0]);
      setEndDate(selectedDate.toISOString().split("T")[0]);
    }
  }, [selectedDate, selectedEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      title,
      start: startDate,
      end: endDate,
      _id: selectedEvent ? selectedEvent._def.extendedProps._id : undefined,
    });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-4 w-full md:w-1/3 lg:w-1/3 m-4">
          <h2 className="text-lg font-semibold mb-4">
            {selectedEvent ? "Edit Event" : "Add Event"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-500 hover:bg-gray-400 text-white  text-sm lg:text-base font-medium lg:px-4 px-2 lg:py-2 py-1 rounded-md lg:mr-2 mr-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-hurryGreen text-white  text-sm md:text-base font-medium lg:px-4 px-2 lg:py-2 py-1 rounded-md"
              >
                {selectedEvent ? "Update" : "Add"}
              </button>
              {selectedEvent && (
                <button
                  type="button"
                  onClick={onDeleteEvent}
                  className="bg-red-500 hover:bg-red-400 text-white text-sm lg:text-base font-medium lg:px-4 px-2 lg:py-2 py-1 rounded-md lg:ml-2 ml-1"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEventModal;
