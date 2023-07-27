import React, { useState, useRef } from "react";

// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./basicComponent.css";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

function useConstructor(callBack = () => { }) {
  const flag = useRef(false);
  if (flag.current) return;
  callBack();
  flag.current = true;
}

export default function BasicTimerComponent({ timer, idx }) {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState(0);

  useConstructor(() => {
    timer.setTime = setTime;
    timer.setIsRunning = setIsRunning;
    console.log("basic timer componenet constructor");
  });

  function toggle() {
    isRunning ? timer.pause() : timer.start();
  }

  function reset(time) {
    timer.reset(time);
  }

  return (
    <Box className="timer">
      <Grid container xs={100} justifyContent={"center"} alignContent={"center"}>
        <h3>{idx}</h3>
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
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
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
      </Grid>

      <Grid container xs={20} justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={20}>
          <span> {input} sec </span>
          <div >
            <button onClick={() => setInput(Number(String(input) + '1'))}>1</button>
            <button onClick={() => setInput(Number(String(input) + '2'))}>2</button>
            <button onClick={() => setInput(Number(String(input) + '3'))}>3</button>
            <button onClick={() => setInput(Number(String(input) + '4'))}>4</button>
            <button onClick={() => setInput(Number(String(input) + '5'))}>5</button>
          </div>
          <div>
            <button onClick={() => setInput(Number(String(input) + '6'))}>6</button>
            <button onClick={() => setInput(Number(String(input) + '7'))}>7</button>
            <button onClick={() => setInput(Number(String(input) + '8'))}>8</button>
            <button onClick={() => setInput(Number(String(input) + '9'))}>9</button>
            <button onClick={() => setInput(Number(String(input) + '0'))}>0</button>
          </div>
          <div>
            <button onClick={() => setInput(Number(String(input).slice(0, -1)))}>취소</button>
            <button onClick={() => reset(input * 1000)}>입력</button>
          </div>
        </Grid>
      </Grid>

    </Box >
  );
}
