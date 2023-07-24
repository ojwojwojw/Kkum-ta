import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BasicTimer from "./timerTestDir/basic_timer";

const initialState = {
    array : []
}

function createTimer() {
    return new BasicTimer();
  }

export const timerSlice = createSlice({
    name : 'timer',
    initialState,

    reducers: {
      create : (state) => {
        state.array = [createTimer() , createTimer() , createTimer() ,createTimer()]
      }
    }
});

export const { create } = timerSlice.actions;

export const selectTimer = (state) => state.timer.array;

export default timerSlice.reducer;
