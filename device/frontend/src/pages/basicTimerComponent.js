
import { useDispatch } from "react-redux";

import React, { useState, useRef, useEffect } from "react";
import BasicTimer from "../timerTestDir/basic_timer";
import { logPauseData } from "../features/timer/timerSlice";

function useConstructor(callBack = () => { }) {
  const flag = useRef(false);
  if (flag.current) return;
  callBack();
  flag.current = true;
}

function BasicTimerComponent(props) {
  
  const [value, setValue] = useState(0);
  const refTimer = useRef(null);
  const refText = useRef(null);
  
  const dispatch = useDispatch();
  const selectedIndex = props.index

  useConstructor(() => {
    refTimer.current = new BasicTimer("", setValue);
  });

  function resume() {
    const timer = refTimer.current;
    timer.isRunning ? timer.pause() : timer.start();

    const payload = { dt: timer.dt, index: selectedIndex }
    dispatch(logPauseData(payload))
  }

  function reset() {
    const timer = refTimer.current;
    timer.reset(refText.current * 1000);
  }

  return (
    <div>
      <button onClick={resume}> {value} </button>
      <button onClick={reset}> reset </button>
      <input type="text"
        placeholder="타이머 시간 설정"
        onChange={(arg) => { refText.current = arg.target.value }}></input>
    </div>
  )
}

export default BasicTimerComponent

