import { useDispatch } from "react-redux";

import React, { useState, useRef, useEffect } from "react";
import BasicTimer from "../timerTestDir/basic_timer";
import { logPauseData } from "../features/timer/timerSlice";
// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./basicTimer.css";

function useConstructor(callBack = () => {}) {
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
  const selectedIndex = props.index;

  useConstructor(() => {
    refTimer.current = new BasicTimer("", setValue);
  });

  function resume() {
    const timer = refTimer.current;
    timer.isRunning ? timer.pause() : timer.start();

    const payload = { dt: timer.dt, index: selectedIndex };
    dispatch(logPauseData(payload));
  }

  function reset() {
    const timer = refTimer.current;
    timer.reset(refText.current * 1000);
  }

  return (
    <Box className="timer">
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={6} className="time">
          {("00" + Math.floor(value / 1000 / 3600)).slice(-2)}:{" "}
          {("00" + Math.floor(value / 1000 / 60)).slice(-2)} :{" "}
          {("00" + Math.floor((value / 1000) % 60)).slice(-2)}
          <span className="micro">
            {("00" + Math.floor(((value / 1000) % 1) * 100)).slice(-2)}
          </span>
        </Grid>
        <Grid item xs={4} className="timerButton">
          <button className="start" onClick={resume}>
            {"▶"}
          </button>
          <button className="reset" onClick={reset}>
            {value == 0 ? "set" : "reset"}
          </button>
        </Grid>
        <Grid item xs={12}>
          <input
            className="inputTime"
            type="text"
            placeholder="타이머 시간 설정"
            onChange={(arg) => {
              refText.current = arg.target.value;
            }}
          ></input>
        </Grid>
      </Grid>
    </Box>
  );
}
export default BasicTimerComponent;
