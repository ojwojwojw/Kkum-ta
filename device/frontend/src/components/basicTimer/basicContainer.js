import React, { useEffect, useRef, useState } from "react";

import BasicTimer from "../../utility/basic_timer";
import BasicStopwatch from "../../utility/basic_stopwatch";
import BasicTimerComponent from "./basicComponent";
import TransitionsModal from "./CreateModal";
import axios from "axios";

import "./basicContainer.css";

export default function TimerContainer() {
  const [timerList, setTimerList] = useState([]);
  const input = useRef(0);

  useEffect(() => {
    console.log("timer container constructor");

    return () => {
      console.log("timer container destructor");
    };
  }, []);

  // 타이머 스톱워치 생성 함수 리팩토링(중복 제거 후 타입으로 구분)
  function createBasicWatch(type, idx) {
    if (timerList.length >= 30) return;

    const newWatch = {
      id: Date.now(),
      type: type,
      timer: type === "timer" ? new BasicTimer() : new BasicStopwatch(),
    };
    // console.log(newWatch);
    setTimerList((prevTimerList) => {
      const newList = [...prevTimerList];
      newList.splice(idx, 0, newWatch);
      return newList;
    });
    return newWatch.id;
  }

  function remove(id) {
    if (timerList.length == 0) return;
    let deleteIdx = 0;
    timerList.forEach((obj, idx) => {
      if (obj.id === id) {
        deleteIdx = idx;
      }
    });

    setTimerList((prevTimerList) => {
      const newList = [...prevTimerList];
      newList.splice(deleteIdx, 1);
      return newList;
    });
  }

  function load() {
    // time, init
    console.log("load");
    // const res = await axios.get("timer/");
  }

  function save() {
    // time, init
    const arr = [];
    timerList.forEach((obj) => {
      const timer = obj.timer;
      const data = timer.save();
      data.type = obj.type;
      arr.push(data);
    });
    console.log(arr);
  }

  function allStart() {
    timerList.forEach(({ timer }) => timer.start());
  }

  function allPause() {
    timerList.forEach(({ timer }) => timer.pause());
  }

  function allReset() {
    timerList.forEach(({ timer }) => timer.reset());
  }

  return (
    <>
      <span style={{ margin: "10px" }}>
        <TransitionsModal createWatch={createBasicWatch} />
        <button
          onClick={() =>
            createBasicWatch((input.type = "timer"), input.current)
          }
        >
          create timer
        </button>
        <button
          onClick={() =>
            createBasicWatch((input.type = "stopWatch"), input.current)
          }
        >
          create stopwatch
        </button>
        {/* <button onClick={() => remove(input.current)}>
          remove
        </button>
        <input type="text"
          onChange={(obj) => { input.current = obj.target.value }}
          style={{ width: "80px" }}
          placeholder="인덱스 입력">
        </input> */}
      </span>
      <span style={{ margin: "10px" }}>
        <button onClick={() => load()}>load</button>
        <button onClick={() => save()}>save</button>
      </span>
      <span style={{ margin: "10px" }}>
        <button onClick={() => allStart()}>all start</button>
        <button onClick={() => allPause()}>all pause</button>
        <button onClick={() => allReset()}>all reset</button>
      </span>
      <div>
        {timerList.map((obj, idx) => {
          console.log(`timer ${idx}`);
          return (
            <BasicTimerComponent
              key={obj.id}
              timer={obj.timer}
              idx={idx}
              type={obj.type}
              removeTimer={remove}
              WatchId={obj.id}
            />
          );
        })}
      </div>
    </>
  );
}
