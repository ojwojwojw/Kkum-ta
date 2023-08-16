import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  userName: null,
  provider: null,
  email: null,
  isAuthenticated: false,
  isDeviceLinked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.userName = action.payload.id;
      state.provider = action.payload.provider;
      state.email = action.payload.email;
      state.isAuthenticated = !state.isAuthenticated;
    },
    logoutState: (state) => {
      state.userName = null;
      state.provider = null;
      state.email = null;
      state.isAuthenticated = !state.isAuthenticated;
      state.isDeviceLinked = false;
    },
    linkDevice: (state,action) => {
      state.isDeviceLinked= action.payload
    },
  },
});

export const { loginState, logoutState ,linkDevice } = authSlice.actions;

export default authSlice.reducer;
