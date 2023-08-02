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
import axios from "axios";

// function useConstructor(callBack = () => {}) {
//   const flag = useRef(false);
//   if (flag.current) return;
//   callBack();
//   flag.current = true;
// }

const StyledTimerContainer = styled(Box)`
  position: relative;
`;

// Styled 컴포넌트를 생성하여 배경색과 너비를 동적으로 변경
const StyledTimerBackground = styled(Box)`
  background-color: ${(props) => `rgba(253, 92, 92, ${props.progress * 0.8})`};
  width: ${(props) => `${props.progress * 100}%`};
  height: 100%; /* Container의 높이만큼 배경화면 크기 설정 */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 15px;
`;

export default function BasicTimerComponent({
  timer,
  idx,
  type,
  removeTimer,
  WatchId,
  initTime,
  load,
}) {
  const [remainTime, setRemainTime] = useState(timer.getRemainTime());
  const [isRunning, setIsRunning] = useState(timer.getIsRunning());
  const [progress, setProgress] = useState(timer.getProgress());
  const [input, setInput] = useState(0);
 

  // 현재 공부중인지를 검사하는 변수
  const [isStudy, setIsStudy] = useState(0);

  useEffect(() => {
    if (WatchId) {
      // console.log("New timer Id:", WatchId);
    }
  }, [WatchId]);

  // useConstructor(() => {
  //   timer.setRemainTime = setRemainTime;
  //   timer.setIsRunning = setIsRunning;
  //   timer.setProgress = setProgress;
  //   console.log("basic timer componenet constructor");
  // });

  useEffect(() => {
    timer.setRemainTime = setRemainTime;
    timer.setIsRunning = setIsRunning;
    timer.setProgress = setProgress;
    console.log("basic timer componenet constructor");
    return () => {
      timer.setRemainTime = null;
      timer.setIsRunning = null;
      timer.setProgress = null;
      console.log("basic timer componenet destructor");
    };
  }, []);

  function toggle() {
    isRunning ? timer.pause() : timer.start();
    isRunning ? logPuase() : logStart(); // api 요청으로 백엔드에 시작/중지 로그 남기기
    

  }

  function remove() {
    removeTimer(WatchId);
  }

  function resetInitTime(initTime, study, maxIter) {
    timer.reset(initTime * 1000, study, maxIter);
    // updateTimer(initTime * 1000)//최초 한번만 api 요청으로 백엔드의 해당 타이머 데이터에 remainTime 수정해주기
    logStop()//api 요청으로 백엔드에 리셋 기록 남기기
    
  }


  //api 요청 관련
  const deleteTimer = async() =>{
    try{
      const timerId = WatchId
      console.log(timerId)
      const res = await axios.delete(`timer/${timerId}`);
      console.log('res',res.data)
      load()
    }
    catch (error){
      console.log(error)
    }
  }

  const logStart = async() => {
    try{
      const timerId = WatchId
      const data = {operation : "start"}
      const res = axios.post(`timer/operation/${timerId}`,data)
      console.log("log start data on backend.")
    }
    catch(err){
      console.log(err)
    }
  }

  const logPuase = async() => {
    try{
      const timerId = WatchId
      const data = {operation : "pause"}
      const res = axios.post(`timer/operation/${timerId}`,data)
      console.log("log pause data on backend.")
    }
    catch(err){
      console.log(err)
    }
  }

  const logStop = async() => {
    try{
      const timerId = WatchId
      const data = {operation : "stop"}
      const res = axios.post(`timer/operation/${timerId}`,data)
      console.log("log stop(reset) data on backend.")
    }
    catch(err){
      console.log(err)
    }
  }

  const updateTimer = async(newInput) => {
    try{
      const timer_id = WatchId
      const data = {initTime : [newInput]}
      const res = await axios.put(`timer/${timer_id}`,data)
      console.log("update initTiime data in backend")
    }
    catch(err){
      console.log(err)
    }
  }


  // useEffect(() => {
  //   console.log("progress:", progress);
  // }, [progress]);
  useEffect(() => {
    // 렌더링이 발생할 때 실행될 코드
  }, [isRunning, input, remainTime]); 

  return (
    <StyledTimerContainer
      container
      className={type === "timer" ? "watch timer" : "watch stopWatch"}
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
          {("00" + Math.floor(remainTime / 1000 / 3600)).slice(-2)}:
          {("00" + Math.floor(((remainTime / 1000) % 3600) / 60)).slice(-2)}:
          {("00" + Math.floor((remainTime / 1000) % 60)).slice(-2)}
          {type === "stopWatch" && (
            <span className="micro">
              {("00" + Math.floor(((remainTime / 1000) % 1) * 100)).slice(-2)}
            </span>
          )}
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
            // 최대값이 99:59:59가 되도록 제한
            onClick={() =>
              resetInitTime(input > 359999 ? 359999 : input, isStudy, 0)
            }
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
            onClick={deleteTimer} //remove는 프런트단에서만 삭제됨
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* 넘패드 컴포넌트로 분리 */}
      {type === "timer" && (
        <Numpad input={input} setInput={setInput} WatchId={WatchId} />
      )}
    </StyledTimerContainer>
  );
}
