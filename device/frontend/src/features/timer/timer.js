import React from 'react';
import { useDispatch } from 'react-redux';
import { create } from './timerSlice';

export function Timer() {

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

        <hr/>
      </div>

    </div>
  );
}
