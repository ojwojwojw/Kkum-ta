import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTimer } from './timerAPI';
import BasicTimer from '../../timerTestDir/basic_timer';

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
    }
  },
});

export const { create , logPauseData , reloadData} = timerSlice.actions;

export const selectArray = (state) => state.timer.timerArray;

export default timerSlice.reducer;
