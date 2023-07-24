import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import BasicTimer from "./timerTestDir/basic_timer";

const container = document.getElementById('root');
const root = createRoot(container);

function createTimer() {
  return new BasicTimer();
}

const timerList = [createTimer(), createTimer(), createTimer()];

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App timer = {timerList}/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
