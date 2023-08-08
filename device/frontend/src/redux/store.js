import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./timerSlice";

export const Mystore = configureStore({
  reducer: {
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
