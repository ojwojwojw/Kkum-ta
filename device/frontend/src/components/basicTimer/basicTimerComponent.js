import React, { useState, useRef, useEffect } from "react";

// mui
import Grid from "@mui/material/Grid";
import "./basicTimer.css";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

function useConstructor(callBack = () => {}) {
  const flag = useRef(false);
  if (flag.current) return;
  callBack();
  flag.current = true;
}

function BasicTimerComponent({ timer, idx }) {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useConstructor(() => {
    timer.setTime = setTime;
    timer.reset(idx * 10 * 1000);
    console.log("basic timer componenet constructor");
  });

  function toggle() {
    if(isRunning) {
      timer.pause();
      setIsRunning(false);
    }
    else {
      timer.start();
      setIsRunning(true);
    }
  }

  function reset(time) {
    timer.reset(time);
  }

  return (
    <Grid container justifyContent={"center"} alignContent={"center"}>
      {idx}
      <Grid item xs={6} className="time">
        {("00" + Math.floor(time / 1000 / 3600)).slice(-2)}:{" "}
        {("00" + Math.floor((time / 1000) % 3600 / 60)).slice(-2)} :{" "}
        {("00" + Math.floor((time / 1000) % 60)).slice(-2)}
        <span className="micro">
          {("00" + Math.floor(((time / 1000) % 1) * 100)).slice(-2)}
        </span>
      </Grid>
      <Grid item xs={4} className="timerButton">
        <Button className="start" onClick={() => toggle()}>
          {isRunning ? (
            <PlayArrowIcon fontSize="large" />
          ) : (
            <PauseIcon fontSize="large" />
          )}
        </Button>
        <Button className="reset" color="warning" onClick={() => reset()}>
            {time === 0 ? (
              <SettingsIcon fontSize="large" />
            ) : (
              <RestartAltIcon fontSize="large" />
            )}
          </Button>

      </Grid>

      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
}
export default BasicTimerComponent;
