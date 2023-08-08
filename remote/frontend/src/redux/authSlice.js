import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    isAthenticated : false,
    refreshToken : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadName: (state, action) => {
            state.userName = action.payload;
            state.isAthenticated = !state.isAthenticated
        },
        loadRefresh: (state, action) => {
            state.refreshToken = action.payload
        }
    }
})


export const {
    loadName,
    loadRefresh,
} = authSlice.actions;

export default authSlice.reducer;