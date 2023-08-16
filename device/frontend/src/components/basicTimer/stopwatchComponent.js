import React, { useState, useEffect, useMemo, useCallback } from "react";
import BasicStopwatch from "../../utility/basic_stopwatch";
import { Button, Grid } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";

function StopwatchComponent({
  groupId,
  isGroupRunning,
  setIsGroupRunning,
  storeTimerArray,
  logStopwatchStart,
  logStopwatchPause,
  text,
}) {
  const [curTime, setCurTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [click, setClick] = useState(0);

  const stopwatch = useMemo(() => new BasicStopwatch(), []);

  // console.log("run?: ", isGroupRunning);
  // console.log(text);

  useEffect(() => {
    stopwatch.setCutTime = setCurTime;
    stopwatch.setIsRunning = setIsRunning;
    return () => {
      stopwatch.setCurTime = null;
      stopwatch.setIsRunning = null;
    };
  }, [stopwatch]);

  // useEffect(() => {
  //   const fetchCurTime = async () => {
  //     try {
  //       const res = await axios.get(`stopwatch/${groupId}`);
  //       const timeData = res.data.time;
  //       setCurTime(timeData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   return fetchCurTime;
  // }, [groupId]);

  // 1초마다 스탑워치 시간 갱신

  useEffect(() => {
    if (isGroupRunning === false) return;
    const fetchCurTime = async () => {
      try {
        const res = await axios.get(`stopwatch/${groupId}`);
        const timeData = res.data.time;
        setCurTime(timeData);
      } catch (err) {
        console.log(err);
      }
    };

    const interval = setInterval(fetchCurTime, 300);

    return () => {
      clearInterval(interval);
    };
  }, [groupId, isGroupRunning]);

  useEffect(() => {
    const groupRunning = storeTimerArray.some((timer) => timer.isRunning);
    setIsGroupRunning(groupRunning);
  }, [setIsGroupRunning, storeTimerArray]);

  const handleStart = useCallback(() => {
    stopwatch.start();
  }, [stopwatch]);

  const handlePause = useCallback(() => {
    stopwatch.pause();
  }, [stopwatch]);

  // const handleReset = () => {
  //   stopwatch.reset();
  //   setIsRunning(false);
  // };

  useEffect(() => {
    setIsRunning(isGroupRunning);
    if (isGroupRunning) {
      handleStart();
      logStopwatchStart(groupId);
    } else {
      handlePause();
      logStopwatchPause(groupId);
    }
  }, [
    isGroupRunning,
    handlePause,
    handleStart,
    logStopwatchStart,
    logStopwatchPause,
    groupId,
  ]);

  useEffect(() => {
    if (isGroupRunning === true && text !== null) {
      if (text !== "detected") {
        handlePause();
        logStopwatchPause(groupId);
      } else {
        handleStart();
        logStopwatchStart(groupId);
      }
    }
  }, [
    groupId,
    handlePause,
    handleStart,
    logStopwatchPause,
    logStopwatchStart,
    isGroupRunning,
    stopwatch,
    text,
  ]);

  return (
    <div>
      <Grid
        container
        className={click % 20 === 0 && click !== 0 ? "img-bomb" : ""}
        position={"fixed"}
        top={"6dvw"}
        ml={"1.8dvw"}
        width={"68.5dvw"}
        height={"6dvw"}
        bgcolor={"#003366"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        zIndex={4}
        fontSize={"2dvw"}
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
            <PauseIcon sx={{ fontSize: "2dvw", color: "white" }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: "2dvw", color: "white" }} />
          )}
        </Button>
      </Grid>
    </div>
  );
}

export default StopwatchComponent;
