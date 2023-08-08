import React, { useState, useEffect } from "react";

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
import { deleteTimer } from "../../redux/timerSlice";
import { useDispatch } from "react-redux";
import {
  forceRendering,
  isRunningTrue,
  isRunningFalse,
} from "../../redux/timerSlice";

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
  background-color: ${(props) =>
    `rgba(253, 92, 92, ${props.progress * props.progress * 0.6 + 0.1})`};
  width: ${(props) => `${props.progress * 100}%`};
  height: 100%; /* Container의 높이만큼 배경화면 크기 설정 */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 10px;
`;

export default function BasicTimerComponent({
  timer,
  idx,
  type,
  WatchId,
  initTime,
  load,
}) {
  const [remainTime, setRemainTime] = useState(timer.getRemainTime());
  const [isRunning, setIsRunning] = useState(timer.getIsRunning());
  const [progress, setProgress] = useState(timer.getProgress());
  const [input, setInput] = useState(0);
  const dispatch = useDispatch();

  // 현재 공부중인지를 검사하는 변수
  const [isStudy, setIsStudy] = useState(0);

  // console.log("init:", initTime);

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
  }, [timer]);

  function toggle() {
    isRunning ? timer.pause() : timer.start();
    isRunning ? logPause() : logStart(); // api 요청으로 백엔드에 시작/중지 로그 남기기
    isRunning
      ? dispatch(isRunningFalse(WatchId))
      : dispatch(isRunningTrue(WatchId));
    dispatch(forceRendering());
  }

  // function remove() {
  //   removeTimer(WatchId);
  // }

  function resetInitTime() {
    timer.reset();
    // updateTimer(initTime * 1000); //최초 한번만 api 요청으로 백엔드의 해당 타이머 데이터에 remainTime 수정해주기
    logStop(); //api 요청으로 백엔드에 리셋 기록 남기기
    dispatch(forceRendering());
  }

  //api 요청 관련
  const deleteWatch = async () => {
    try {
      const timerId = WatchId;
      // console.log(timerId)
      timer.pause();
      const res = await axios.delete(`timer/${timerId}`);
      console.log("res", res.data);
      dispatch(deleteTimer(timerId));
      dispatch(forceRendering());
    } catch (error) {
      console.log("occured error during delete request.", error);
      // const timerId = WatchId;
      //  console.log(timerId)
    }
  };

  const logStart = async () => {
    const startTime = Date.now();

    // 비동기 요청 보내기
    try {
      const timerId = WatchId;
      const data = { operation: "start" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log start data on backend.", res.data);
      const endTime = Date.now();
      const requestDuration = endTime - startTime;
      console.log("요청-응답 시간:", requestDuration, "밀리초");
    } catch (err) {
      console.log(err);
    }
  };

  const logPause = async () => {
    // const startTime = Date.now();
    try {
      const timerId = WatchId;
      const data = { operation: "pause" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log pause data on backend.", res.data);
      // const endTime = Date.now();
      // const requestDuration = endTime - startTime;
      // console.log("요청-응답 시간:", requestDuration, "밀리초");
    } catch (err) {
      console.log(err);
    }
  };

  const logStop = async () => {
    try {
      const timerId = WatchId;
      const data = { operation: "stop" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log stop(reset) data on backend.", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTimer = async (newInput) => {
    try {
      const timer_id = WatchId;
      const data = { initTime: [newInput] };
      const res = await axios.put(`timer/${timer_id}`, data);
      console.log("update initTiime data in backend", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledTimerContainer
      className={type === "timer" ? "watch timer" : "watch stopWatch"}
    >
      <StyledTimerBackground className="progress-bar" progress={progress} />
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={1} fontSize={"3dvh"}>
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
          <Button
            className={isRunning ? "btn pause" : "btn start"}
            onClick={() => toggle()}
          >
            {isRunning ? (
              <PauseIcon sx={{ fontSize: "6.5dvh" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: "6.5dvh" }} />
            )}
          </Button>
          <Button
            className={remainTime === 0 ? "btn set" : "btn reset"}
            color="warning"
            // 최대값이 99:59:59가 되도록 제한
            onClick={() => resetInitTime()}
          >
            {remainTime === 0 ? (
              <SettingsIcon sx={{ fontSize: "6.5dvh" }} />
            ) : (
              <RestartAltIcon sx={{ fontSize: "6.5dvh" }} />
            )}
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="delete"
            variant="text"
            color="error"
            onClick={deleteWatch} //remove는 프런트단에서만 삭제됨
          >
            <CloseIcon sx={{ fontSize: "5dvh" }} />
          </IconButton>
        </Grid>
      </Grid>
    </StyledTimerContainer>
  );
}
