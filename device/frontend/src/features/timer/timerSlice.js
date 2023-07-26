import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTimer } from './timerAPI';

const initialState = {
  timerArray : [],
};

const createTimerObject = () => {
  // return new BasicTimer()
  return (
    {}
  );
}

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
      state.timerArray.push(createTimerObject());
    },
    logPauseData: (state , action) => {
      const dt = action.payload.dt
      const index = action.payload.index
      state.timerArray[index].dt = dt
    },
    reloadData: (state) =>{
      state.timerArray.push(createTimerObject());
      state.timerArray.pop(createTimerObject());
    },
    setTimer: (state ,action) =>{
      state.timerArray[action.payload.key1].dt = action.payload.key2; 
    }
  },
});

export const { create , logPauseData , reloadData , setTimer} = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;
