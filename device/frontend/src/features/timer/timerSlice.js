import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTimer } from './timerAPI';

const initialState = {
  value: 0,
  status: 'idle',
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
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = timerSlice.actions;

export const selectTimer = (state) => state.timer.value;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectTimer(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default timerSlice.reducer;
