import React, { useEffect } from "react";

import BasicTimer from "../../utility/basic_timer";
import BasicTimerComponent from "./basicTimerComponent";

import { useState } from "react";

export default function TimerContainer() {
  const [timerList, setTimerList] = useState([]);

  useEffect(() => {
    console.log("timer container constructor");

    return (() => {
      console.log("timer container destructor");
    })
  }, []);

  function createTimer() {
    setTimerList(prevTimerList => {
      const obj = { id: Date.now(), timer: new BasicTimer() };
      return [...prevTimerList, obj]
    });
  }

  function removeTimer(idx) {
    setTimerList(prevTimerList => {
      const newList = [...prevTimerList];
      newList.splice(idx, 1);
      return newList;
    });
  }

  return (
    <>
      <button onClick={() => createTimer()}>
        create timer
      </button>
      {console.log("timer container div")}
      <button onClick={() => removeTimer(3)}>
        remove timer
      </button>
      <div>
        {
          timerList.map((obj, idx) => {
            console.log(`timer ${idx}, time ${obj.timer.getTime()}`)
            return (<BasicTimerComponent key={obj.id} timer={obj.timer} idx={idx}></BasicTimerComponent>);
          })
        }
      </div>
    </>
  )
}