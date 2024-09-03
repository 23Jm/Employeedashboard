"use client";

import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "@/redux/slices/eventSlice";
import AddEventModal from "../../../../components/AddEventModal/AddEventModal";
import React, { useEffect, useState } from "react";
import ReduxProvider from "../../../../components/Provider/ReduxProvider";

import "./fullcalendar-custom.css";
import axios from "axios";
import moment from "moment";

const Calendar = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)

   useEffect(() => {
     const fetchHolidays = async () => {
       try {
         const response = await axios.get(
           "http://192.168.29.240:8000/api/v1/getHolidays"
         );
         setHolidays(response.data.holidays);
       } catch (err) {
         setError("Failed to fetch holidays");
       }
     };
     fetchHolidays();
   }, []);
  // const holidayList = [
  //   { name: "New Year's Day", date: "2024-01-01" },
  //   { name: "Makar Sankranti", date: "2024-01-15" },
  //   { name: "Republic Day", date: "2024-01-26" },
  //   { name: "Vasant Panchami", date: "2024-02-14" },
  //   { name: "Maha Shivaratri", date: "2024-03-08" },
  //   { name: "Holi", date: "2024-03-25" },
  //   { name: "Ram Navami", date: "2024-04-17" },
  //   { name: "Good Friday", date: "2024-03-29" },
  //   { name: "Eid ul-Fitr", date: "2024-04-11" },
  //   { name: "Ambedkar Jayanti", date: "2024-04-14" },
  //   { name: "Mahavir Jayanti", date: "2024-04-21" },
  //   { name: "May Day", date: "2024-05-01" },
  //   { name: "Buddha Purnima", date: "2024-05-23" },
  //   { name: "Eid ul-Adha (Bakrid)", date: "2024-06-17" },
  //   { name: "Rath Yatra", date: "2024-07-07" },
  //   { name: "Muharram", date: "2024-07-16" },
  //   { name: "Independence Day", date: "2024-08-15" },
  //   { name: "Raksha Bandhan", date: "2024-08-19" },
  //   { name: "Janmashtami", date: "2024-08-26" },
  //   { name: "Ganesh Chaturthi", date: "2024-09-07" },
  //   { name: "Gandhi Jayanti", date: "2024-10-02" },
  //   { name: "Dussehra (Vijayadashami)", date: "2024-10-12" },
  //   { name: "Maharishi Valmiki Jayanti", date: "2024-10-17" },
  //   { name: "Diwali", date: "2024-10-31" },
  //   { name: "Bhai Dooj", date: "2024-11-02" },
  //   { name: "Guru Nanak Jayanti", date: "2024-11-15" },
  //   { name: "Christmas Day", date: "2024-12-25" },
  // ];
  const filterHolidaysByMonth = (holidays, month) => {
    return holidays.filter(
      (holiday) => new Date(holiday.date).getMonth() + 1 === month
    );
  };

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value, 10));
  };
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDateClick = (info) => {
    setSelectedDate(info.date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedDate(null);
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleAddEvent = (eventData) => {
    if (selectedEvent) {
      dispatch(
        updateEvent({
          ...eventData,
          _id: selectedEvent._def.extendedProps._id,
        })
      );
      console.log(selectedEvent._def.extendedProps._id);
      console.log("selectedevent");
    } else {
      dispatch(addEvent(eventData));
    }
    closeModal();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent._def.extendedProps._id));
    }
    closeModal();
  };
  const currentYear = new Date().getFullYear();
  return (
    <>
      <main className="bg-gray-100 pb-4 h-screen rounded-lg">
        <div className="p-4 grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="p-4 lg:col-span-2 col-span-1 bg-white h-full">
            <div className="flex justify-between mb-2">
              <h1 className="md:text-xl text-sm">Event Calendar</h1>
              <button
                onClick={() => {
                  setSelectedDate(new Date());
                  setSelectedEvent(null);
                  setIsModalOpen(true);
                }}
                className="bg-gray-500 hover:bg-gray-400 font-medium text-white  text-[10px] md:p-2 p-1 rounded-md inline-block"
              >
                Add Event
              </button>
            </div>
            <div className="md:p-4">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events.map((event) => ({
                  title: event.title,
                  start: event.start,
                  end: event.end,
                  _id: event._id,
                }))}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                }}
                height="auto"
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                editable={true}
                selectable={true}
              />
            </div>
            <AddEventModal
              isOpen={isModalOpen}
              setOpen={setIsModalOpen}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
              selectedDate={selectedDate}
              selectedEvent={selectedEvent}
            />
          </div>
          <div className="bg-white lg:col-span-1 md:p-4 p-1">
            <h1 className="md:text-xl text-sm mb-4">
              List of Holidays and Events in {currentYear}
            </h1>
            <div className="mb-4">
              <label htmlFor="month" className="mr-2 text-sm">
                Select Month:
              </label>
              <select
                id="month"
                value={month}
                onChange={handleMonthChange}
                className="p-2 border rounded text-sm"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(0, i).toLocaleString("en", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="w-full overflow-scroll divide-y divide-gray-200 border-collapse border border-gray-300">
                <thead className="bg-gray-50 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
                    >
                      Holiday Name
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full bg-white divide-y divide-gray-200">
                  {filterHolidaysByMonth(holidays, month).map((holiday) => (
                    <tr key={holiday.date}>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-black border border-gray-300">
                        {moment(holiday.date).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-black border border-gray-300">
                        {holiday.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default function PageWrapper() {
  return (
    <ReduxProvider>
      <Calendar />
    </ReduxProvider>
  );
}
