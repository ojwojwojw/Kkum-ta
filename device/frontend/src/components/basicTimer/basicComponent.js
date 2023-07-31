import React, { useState, useRef, useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./basicComponent.css";
import CloseIcon from "@mui/icons-material/Close";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "@emotion/styled";
import { Button, IconButton } from "@mui/material";
import Numpad from "./numpad";


function useConstructor(callBack = () => {}) {
  const flag = useRef(false);
  if (flag.current) return;
  callBack();
  flag.current = true;
}



const StyledTimerContainer = styled(Box)`
  position: relative;
`;

// Styled 컴포넌트를 생성하여 배경색과 너비를 동적으로 변경
const StyledTimerBackground = styled(Box)`
  background-color: ${props => `rgba(253, 92, 92, ${props.progress*0.8})`};
  width: ${props => `${props.progress * 100}%`};
  height: 100%; /* Container의 높이만큼 배경화면 크기 설정 */
  position: absolute;
  top: 0;
  left: 0;
  z-index : -1;
  border-radius: 15px;
`;



export default function BasicTimerComponent({
  timer,
  idx,
  type,
  removeTimer,
  WatchId,
}) {
  const [remainTime, setRemainTime] = useState(0);
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState(null);

  useEffect(() => {
    if (WatchId) {
      // console.log("New timer Id:", WatchId);
    }
  }, [WatchId]);

  useConstructor(() => {
    timer.setTime = setRemainTime;
    timer.setIsRunning = setIsRunning;
    timer.setProgress = setProgress;
    console.log("basic timer componenet constructor");
  });

  useEffect(() => {
    return () => {
      timer.reset();
      console.log("basic timer componenet destructor");
    };
  }, []);

  function toggle() {
    isRunning ? timer.pause() : timer.start();
  }


  function reset() {
    // console.log(timer);
    timer.reset(input * 1000);
  }

  function remove() {
    removeTimer(WatchId);
  }



  useEffect(() => {
    console.log("progress:", progress);
  }, [progress]);


  return (
    <StyledTimerContainer
      container
      className={type == "timer" ? "watch timer" : "watch stopWatch"}
    >
      <StyledTimerBackground className="progress-bar" progress={progress} />
      <Grid
        container
        xs={100}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Grid xs={1}>
          <h2>{idx + 1}</h2>
        </Grid>

        <Grid item xs={6} className="time">
          {("00" + Math.floor(remainTime / 1000 / 3600)).slice(-2)}:{" "}
          {("00" + Math.floor(((remainTime / 1000) % 3600) / 60)).slice(-2)} :{" "}
          {("00" + Math.floor((remainTime / 1000) % 60)).slice(-2)}
          <span className="micro">
            {("00" + Math.floor(((remainTime / 1000) % 1) * 100)).slice(-2)}
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
          <Button
            className="reset"
            color="warning"
            onClick={() => timer.reset()}
          >
            {remainTime === 0 ? (
              <SettingsIcon fontSize="large" />
            ) : (
              <RestartAltIcon fontSize="large" />
            )}
          </Button>
        </Grid>
        <Grid>
          <IconButton
            ton
            aria-label="delete"
            variant="text"
            color="error"
            size="large"
            onClick={remove}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* 넘패드 컴포넌트로 분리 */}
      <Numpad input={input} setInput={setInput} WatchId={WatchId} />
      {/*
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
          </div>
        </Grid>
      </Grid>
                
    

      </Grid> */}
    </StyledTimerContainer>
  );
}
