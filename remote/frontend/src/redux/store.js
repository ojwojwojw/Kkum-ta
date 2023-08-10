import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export const Mystore = configureStore({
    reducer: {
        auth: authReducer
    },
})