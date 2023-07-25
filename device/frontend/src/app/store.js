import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import timerReducer from '../features/timer/timerSlice';
import numberPadReducer from '../features/numberpad/numberPadSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timer: timerReducer,
    numberpad : numberPadReducer,
  },
});
