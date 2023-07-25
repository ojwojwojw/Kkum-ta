import React, { useState, useRef } from "react";
import BasicTimer from "../timerTestDir/basic_timer";

import { Timer } from "../features/timer/timer";

const TimerCreatePage = ({ timer }) => {
  const [value, setValue] = useState(0);
  const refTimer = useRef(null);
  const refText = useRef(null);

  function resume() {
    if (refTimer.current === null) {
      refTimer.current = new BasicTimer("", setValue);
    }
    const timer = refTimer.current;
    timer.isRunning ? timer.pause() : timer.start();
  }

  function reset() {
    if (refTimer.current === null) {
      refTimer.current = new BasicTimer("", setValue);
    }
    const timer = refTimer.current;
    timer.reset(refText.current * 1000);
  }

  return (
    <div>
      <button onClick={resume}> {value} </button>
      <button onClick={reset}> reset </button>
      <input
        type="text"
        placeholder="타이머 시간 설정"
        onChange={(arg) => {
          refText.current = arg.target.value;
        }}
      ></input>
      <Timer />
      <div>
        <button
          onClick={() => {
            timer[0].isRunning ? timer[0].pause() : timer[0].start();
          }}
        >
          {" "}
          {value}{" "}
        </button>
        <button onClick={() => timer[0].reset(3 * 1000)}> reset </button>
      </div>
    </div>
  );
};
export default TimerCreatePage;
