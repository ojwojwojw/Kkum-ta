import React, { useState, useEffect, useMemo, useCallback } from "react";
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
    stopwatch.setCurTime = setCurTime;
    stopwatch.setIsRunning = setIsRunning;
    return () => {
      stopwatch.setCurTime = null;
      stopwatch.setIsRunning = null;
    };
  }, [stopwatch]);

  useEffect(() => {
    const groupRunning = storeTimerArray.some(
      (timer) => timer.isRunning === true
    );
    setIsGroupRunning(groupRunning);
  }, [setIsGroupRunning, storeTimerArray]);

  const handleStart = useCallback(() => {
    stopwatch.start();
    setIsRunning(true);
  }, [stopwatch]);

  const handlePause = useCallback(() => {
    stopwatch.pause();
    setIsRunning(false);
  }, [stopwatch]);

  const handleReset = () => {
    stopwatch.reset();
    setIsRunning(false);
  };

  useEffect(() => {
    setIsRunning(isGroupRunning);
    if (isGroupRunning) {
      handleStart();
    } else {
      handlePause();
    }
  }, [isGroupRunning, handlePause, handleStart]);

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
          Math.floor((curTime / 1000 / 3600) % 100)
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
