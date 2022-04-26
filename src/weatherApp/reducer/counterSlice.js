import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  label: "Tel-Aviv",
  value: 215854,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    update: (state, action) => {
      state.label = action.payload.label;
      state.value = action.payload.value;
    },
  },
});

export const { update } = weatherSlice.actions;

export default weatherSlice.reducer;
