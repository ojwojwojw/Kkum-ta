import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchNumberPad } from "./numberPadAPI";


const initialState = {
    selectingTimer : null,
    value : '',
};


export const incrementAsync = createAsyncThunk(
    'numberPad/fetchNumberPad',
    async (amount) => {
        const response = await fetchNumberPad(amount);
        return response.data;
    }
)

export const numberPadSlice = createSlice({
    name: 'numberPad',
    initialState,
    reducers : {
       insertNumber: (state, action) =>{
            state.value += action.payload
       },
       deleteNumber: (state, action) =>{
            state.value = state.value.slice(0,-1)
       },
    }
});

export const {insertNumber , deleteNumber} = numberPadSlice.actions

export default numberPadSlice.reducer