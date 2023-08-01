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
import TransitionsModal from "./transitionsModal";

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
  removeTimer,
  WatchId,
  initTime,
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

  useConstructor(() => {
    timer.setRemainTime = setRemainTime;
    timer.setIsRunning = setIsRunning;
    timer.setProgress = setProgress;
    console.log("basic timer componenet constructor");
  });

  useEffect(() => {
    return () => {
      console.log("basic timer componenet destructor");
    };
  }, []);

  function toggle() {
    isRunning ? timer.pause() : timer.start();
  }

  function remove() {
    removeTimer(WatchId);
  }

  function resetInitTime(initTime, study, maxIter) {
    timer.reset(initTime * 1000, study, maxIter);
  }

  // useEffect(() => {
  //   console.log("progress:", progress);
  // }, [progress]);

  return (
    <StyledTimerContainer
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
          <Button
            className={isRunning ? "btn pause" : "btn start"}
            onClick={() => toggle()}
          >
            {isRunning ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </Button>
          <Button
            className={remainTime === 0 ? "btn set" : "btn reset"}
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
            onClick={remove}
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
