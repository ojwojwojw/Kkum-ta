import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTimer } from './timerAPI';
import BasicTimer from '../../timerTestDir/basic_timer';

const initialState = {
  timerArray : [],
};

const createTimerObject = () => {
  return new BasicTimer()
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
  },
});

export const { create } = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;
