import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  create,
  selectArray,
  reloadData
} from './timerSlice';

export function Timer() {
  let timerArray = useSelector( (state)=> {return state.timer.timerArray});
  const dispatch = useDispatch();
  console.log(timerArray)

  return (
    <div>
      <div >
        <hr/>
        <button
          onClick={()=> dispatch(create())}
        >
          createTimer
        </button>

        <button
          onClick={()=> dispatch(reloadData())}        
        >
          스테이트 변경감지
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
