import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timerArray : [],
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    fetchData: (state, action) =>{
      state.timerArray = action.payload;
    },
    create: (state ,action) => {
      state.timerArray.push(action.payload);
    },
    deleteTimer: (state, action) => {
      state.timerArray = state.timerArray.filter((item , index) => item.id !== action.payload)
    },
  },
});

export const {  create , fetchData ,deleteTimer,} = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;

