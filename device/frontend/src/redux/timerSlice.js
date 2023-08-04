import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timerArray : [],
  Rendering : false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    fetchData: (state, action) =>{
      state.timerArray = action.payload;
    },
    create: (state ,action) => {
      console.log(action.payload)
      state.timerArray.push(action.payload);
    },
    deleteTimer: (state, action) => {
      state.timerArray = state.timerArray.filter((item) => item.id !== action.payload)
      console.log('is changed?',state.timerArray)
    },
    forceRendering : (state) =>{
      state.Rendering = !state.Rendering
    }
  },
});

export const {  create , fetchData ,deleteTimer, forceRendering} = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;

