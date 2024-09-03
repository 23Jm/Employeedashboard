import {configureStore} from "@reduxjs/toolkit";
import eventSlice from "../slices/eventSlice";
import loginSlice from "../slices/loginSlice";

const store = configureStore({
  reducer: {
    events: eventSlice,
    Login: loginSlice,
  },
});

export  default store;