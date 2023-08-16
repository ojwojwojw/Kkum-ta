import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timerArray  : []
}

export const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers : {
        fetchData : (state,action) => {
            state.timerArray = action.payload
        },
    }
})

export const { fetchData } = timerSlice.actions;

export default timerSlice.reducer;