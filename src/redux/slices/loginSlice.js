import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },

  },
});

export const { addUser } = loginSlice.actions;
export default loginSlice.reducer;
