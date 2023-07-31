import React, { useEffect, useRef, useState } from "react";

import BasicTimer from "../../utility/basic_timer";
import BasicStopwatch from "../../utility/basic_stopwatch";
import BasicTimerComponent from "./basicComponent";
import TransitionsModal from "./CreateModal";
import axios from "axios";

import "./basicContainer.css";

export default function TimerContainer({ timerList, id }) {
  const [_, setDummy] = useState(0); // 랜더링 강제로 일으키기 위해 사용
  const input = useRef(0);

  useEffect(() => {
    console.log("timer container constructor");
    return () => {
      console.log("timer container destructor");
    };
  }, []);

  // 타이머 스톱워치 생성 함수 리팩토링(중복 제거 후 타입으로 구분)
  function createBasicWatch(type, idx) {
    if (timerList.length >= 5) return;

    const newWatch = {
      id: Date.now(),
      type: type,
      timer: type === "timer" ? new BasicTimer() : new BasicStopwatch(),
    };
    // console.log(newWatch);
    setDummy((prev) => {
      timerList.splice(idx, 0, newWatch);
      return prev + 1;
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

    setDummy((prev) => {
      timerList[deleteIdx].timer.pause(); // clearInterval 을 위해 반드시 호출 !!
      timerList.splice(deleteIdx, 1);
      return prev + 1;
    });
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

  //API 요청관련

  const load = async () => {
    try {
      const res = await axios.get("timer/");
      console.log("load");
      console.log(res.data);
      console.log(timerList)
      setDummy((prev) => {
        res.data.map((item, idx) => {
          console.log(`${idx} : ${item}`);
          const timer = new BasicTimer();
          timer.load(item);
          timerList.push({ id: Date.now(), type: "timer", timer: timer });
          return prev + 1;
        })
      });
    } catch (error) {
      console.log("Error Occured During Fetch: ", error);
    }
  };

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
