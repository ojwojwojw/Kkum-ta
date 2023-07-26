import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTimer } from './timerAPI';

const initialState = {
  timerArray : [],
};

export const incrementAsync = createAsyncThunk(
  'timer/fetchTimer',
  async (amount) => {
    const response = await fetchTimer(amount);
    return response.data;
  }
);

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    create: (state) => {
      state.timerArray.push({});
    },
    logData: (state , action) => {
      const data = action.payload.data;
      const index = action.payload.index;
      state.timerArray[index] = data;
    },
    reloadData: (state) =>{
      state.timerArray.push({});
      state.timerArray.pop({});
    },
    setTimer: (state ,action) =>{
      state.timerArray[action.payload.key1].dt = action.payload.key2; 
    }
  },
});

export const { create , logData , reloadData , setTimer} = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;
