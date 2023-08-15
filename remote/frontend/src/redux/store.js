import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'
import timerSlice from './timerSlice'

const reducers = combineReducers({
    auth : authReducer,
    timer : timerSlice
})

const persistConfig = {
    key: "root", 
    storage, 
    whitelist: ["auth"], 
  }
  
const persistedReducer = persistReducer(persistConfig, reducers)

const Mystore = configureStore({
    reducer: persistedReducer,
    devTools : process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default Mystore