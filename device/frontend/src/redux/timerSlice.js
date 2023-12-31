import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timerArray: [],
  Rendering: false,
  timeToInsert: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.timerArray = action.payload;
    },
    create: (state, action) => {
      // console.log("payload:", action.payload);
      state.timerArray = [...state.timerArray, action.payload];
    },
    deleteTimer: (state, action) => {
      state.timerArray = state.timerArray.filter(
        (item) => item.id !== action.payload
      );
      // console.log('is changed?',state.timerArray);
    },
    isRunningTrue: (state, action) => {
      state.timerArray = state.timerArray.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            isRunning: true,
          };
        }
        return item; // 반드시 값을 반환해야 합니다.
      });
    },
    isRunningFalse: (state, action) => {
      state.timerArray = state.timerArray.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            isRunning: false,
          };
        }
        return item; // 반드시 값을 반환해야 합니다.
      });
    },
    forceRendering: (state) => {
      state.Rendering = !state.Rendering;
    },
    setTimeToInsert: (state, action) => {
      state.timeToInsert = action.payload;
    },
    changeInitTimeForInsert: (state, action) => {
      state.timerArray = state.timerArray.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            initTime: action.payload.value,
          };
        }
        return item; // 반드시 값을 반환해야 합니다.
      });
    },
  },
});

export const {
  create,
  fetchData,
  deleteTimer,
  toggleIsRunning,
  forceRendering,
  isRunningTrue,
  isRunningFalse,
  setTimeToInsert,
  changeInitTimeForInsert,
} = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;
