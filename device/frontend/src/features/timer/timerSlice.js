import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { fetchTimer } from "./timerAPI";
import BasicTimer from "./timerTestDir/basic_timer";

const initialState = {
  array : [] ,
  status: 'idle',
};

function createTimer() {
    return new BasicTimer();
  }

  export const incrementAsync = createAsyncThunk(
    'timer/fetchTimer',
    async (amount) => {
      const response = await fetchTimer(amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const timerSlice = createSlice({
    name : 'timer',
    initialState,

    reducers: {
      create : (state) => {
        state.array = [createTimer() , createTimer() , createTimer() ,createTimer()]
      }
    },

    extraReducers: (builder) => {
      builder
        .addCase(incrementAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          // state.value += action.payload;
        });
    },

});


export const { create } = timerSlice.actions;

export const selectTimer = (state) => state.timer.array;

export default timerSlice.reducer;
