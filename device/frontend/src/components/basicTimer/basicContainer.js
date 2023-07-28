import React, { useEffect, useRef, useState } from "react";

import BasicTimer from "../../utility/basic_timer";
import BasicStopwatch from "../../utility/basic_stopwatch";
import BasicTimerComponent from "./basicComponent";

import axios from "axios";

import './basicContainer.css'

export default function TimerContainer() {

  const [timerList, setTimerList] = useState([]);
  const input = useRef(0);

  useEffect(() => {
    console.log("timer container constructor");

    return (() => {
      console.log("timer container destructor");
    })
  }, []);

  function createBasicTimer(idx) {
    if (timerList.length >= 30) return;
    setTimerList(prevTimerList => {
      const obj = { id: Date.now(), type: "timer", timer: new BasicTimer() }; // 식별자 필수!!
      const newList = [...prevTimerList];
      newList.splice(idx, 0, obj);
      return newList;
    });
  }

  function createBasicStopwatch(idx) {
    if (timerList.length >= 30) return;
    setTimerList(prevTimerList => {
      const obj = { id: Date.now(), timer: new BasicStopwatch() }; // 식별자 필수!!
      const newList = [...prevTimerList];
      newList.splice(idx, 0, obj);
      return newList;
    });
  }

  function remove(idx) {
    if (timerList.length == 0) return;
    setTimerList(prevTimerList => {
      const newList = [...prevTimerList];
      newList.splice(idx, 1);
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
    timerList.forEach(obj => {
      const timer = obj.timer;
      const data = timer.save();
      data.type = obj.type;
      arr.push(data);
    })
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
      <span style={{margin : "10px"}}>
        <button onClick={() => createBasicTimer(input.current)}>
          create timer
        </button>
        <button onClick={() => createBasicStopwatch(input.current)}>
          create stopwatch
        </button>
        <button onClick={() => remove(input.current)}>
          remove
        </button>
        <input type="text"
          onChange={(obj) => { input.current = obj.target.value }}
          style={{ width: "80px" }}
          placeholder="인덱스 입력">
        </input>
      </span>
      <span style={{margin : "10px"}}>
        <button onClick={() => load()}>
          load
        </button>
        <button onClick={() => save()}>
          save
        </button>
      </span>
      <span style={{margin : "10px"}}>
        <button onClick={() => allStart()}>
          all start
        </button>
        <button onClick={() => allPause()}>
          all pause
        </button>
        <button onClick={() => allReset()}>
          all reset
        </button>
      </span>
      <div>
        {
          timerList.map((obj, idx) => {
            console.log(`timer ${idx}`)
            return (<BasicTimerComponent key={obj.id} timer={obj.timer} idx={idx}></BasicTimerComponent>);
          })
        }
      </div>
    </>
  )
}