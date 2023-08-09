import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    provider: null,
    email : null,
    password : null,
    isAuthenticated : false,
    refreshToken : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginState: (state, action) => {
            state.userName = action.payload.id;
            state.provider = action.payload.provider;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.isAuthenticated = !state.isAuthenticated
        },
        logoutState: (state) => {
            state.userName = null
            state.provider = null
            state.email = null
            state.isAuthenticated = !state.isAuthenticated
        }
    }
})


export const {
    loginState,
    logoutState,
} = authSlice.actions;

export default authSlice.reducer;