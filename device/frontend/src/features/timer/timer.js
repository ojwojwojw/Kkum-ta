import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  create,
  decrement,
  increment,
  selectArray,
} from './timerSlice';

export function Timer() {
  const timerArray = useSelector(selectArray);
  const dispatch = useDispatch();

  return (
    <div>
      <div >
        <hr/>
        <button
          onClick={()=> dispatch(create())}
        >
          createTimer
        </button>

        {timerArray.map((timerObj, index) => (
        <div key={index}>
          pk : {index}
          | dt : {timerObj.dt}
          | name : {timerObj.name}
          | setValue : {timerObj.setValue}
          | is Running : {timerObj.isRunning}
        </div>
        ))}
        <hr/>
      </div>
      
    </div>
  );
}
