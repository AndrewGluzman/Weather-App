import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "../weatherApp/reducer/counterSlice";

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
});
