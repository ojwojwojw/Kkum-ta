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
  console.log(timerArray);

  return (
    <div>
      <div >
        <hr/>
        <button
          onClick={()=> dispatch(create())}
        >
          createTimer
        </button>

        <hr/>
      </div>

    </div>
  );
}
