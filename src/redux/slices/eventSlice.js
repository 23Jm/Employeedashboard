import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetching events from backend
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage");
    return [];
  }

  const response = await axios.get(
    "http://192.168.29.240:8000/api/v1/event/getAllEvent",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

// Adding new events
export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (eventData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    const response = await axios.post(
      "http://192.168.29.240:8000/api/v1/event/addEvent",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Updating an event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    const event_id = event._id;
    console.log("eventis");
    console.log(event._id);
    const response = await axios.put(
      `http://192.168.29.240:8000/api/v1/event/updateEvent/${event_id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Deleting an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (_id) => {
    console.log("delete id");
    console.log(_id);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      return;
    }
    await axios.delete(
      `http://192.168.29.240:8000/api/v1/event/deleteEvent/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return _id;
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      });
  },
});

export default eventSlice.reducer;
