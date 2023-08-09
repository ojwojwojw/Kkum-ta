import React, { useState, useEffect, useMemo } from "react";
import BasicStopwatch from "../../utility/basic_stopwatch";
import { Button, Grid } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function StopwatchComponent({
  isGroupRunning,
  setIsGroupRunning,
  storeTimerArray,
}) {
  const [curTime, setCurTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [click, setClick] = useState(0);

  const stopwatch = useMemo(() => new BasicStopwatch(), []);

  useEffect(() => {
    stopwatch.setCurTime = setCurTime; // BasicStopwatch에서 사용할 state setter 설정
    stopwatch.setIsRunning = setIsRunning; // BasicStopwatch에서 사용할 state setter 설정
    return () => {
      stopwatch.setCurTime = null;
      stopwatch.setIsRunning = null;
    };
  }, [stopwatch]);

  useEffect(() => {
    const groupRunning = storeTimerArray.some((timer) => timer.isRunning);
    setIsGroupRunning(groupRunning);
  }, [setIsGroupRunning, storeTimerArray]);

  useEffect(() => {
    setIsRunning(isGroupRunning);
    if (isGroupRunning) {
      handleStart();
    } else {
      handlePause();
    }
  }, [isGroupRunning]);

  const handleStart = () => {
    stopwatch.start();
    setIsRunning(true);
  };

  const handlePause = () => {
    stopwatch.pause();
    setIsRunning(false);
    setCurTime(curTime);
  };

  const handleReset = () => {
    stopwatch.reset();
    setIsRunning(false);
    setCurTime(0);
  };

  return (
    <div>
      <Grid
        container
        className={click % 20 === 0 && click !== 0 ? "img-bomb" : ""}
        position={"fixed"}
        top={"100px"}
        ml={"32px"}
        width={"68.5dvw"}
        height={"13dvh"}
        bgcolor={"#003366"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        zIndex={4}
        fontSize={"4.3dvh"}
        onClick={() => {
          setClick(click + 1);
        }}
      >
        <p>{`지금까지 공부한 시간   ${String(
          Math.floor(curTime / 1000 / 3600)
        ).padStart(2, "0")} :
          ${String(Math.floor(((curTime / 1000) % 3600) / 60)).padStart(
            2,
            "0"
          )} :
          ${String(Math.floor((curTime / 1000) % 60)).padStart(2, "0")}`}</p>
        <div></div>

        <Button onClick={() => (isRunning ? handlePause() : handleStart())}>
          {isRunning ? (
            <PauseIcon sx={{ fontSize: "5dvh", color: "white" }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: "5dvh", color: "white" }} />
          )}
        </Button>
      </Grid>
    </div>
  );
}

export default StopwatchComponent;
