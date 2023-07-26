import { useDispatch } from "react-redux";

import React, { useState, useRef } from "react";
import BasicTimer from "../../utility/basic_timer";
import { logPauseData } from "../../features/timer/timerSlice";

// mui
import Box from "@mui/material/Box";
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
    timer.isRunning() ? timer.pause() : timer.start();

    const payload = { dt: timer.getTime(), index: selectedIndex };
    dispatch(logPauseData(payload));
  }

  function reset() {
    const timer = refTimer.current;
    timer.reset(refText.current * 1000);
  }

  return (
    <Box className="timer">
      <Grid container justifyContent={"center"} alignSelf={"center"}>
        <Grid item xs={6} className="time" onClick={resume}>
          {("00" + Math.floor(value / 1000 / 3600)).slice(-2)}:{" "}
          {("00" + Math.floor(value / 1000 / 60)).slice(-2)} :{" "}
          {("00" + Math.floor((value / 1000) % 60)).slice(-2)}
          <span className="micro">
            {("00" + Math.floor(((value / 1000) % 1) * 100)).slice(-2)}
          </span>
        </Grid>
        <Grid item xs={4} className="timerButton">
          <Button className="start" onClick={resume}>
            {1 ? (
              <PlayArrowIcon fontSize="large" />
            ) : (
              <PauseIcon fontSize="large" />
            )}
          </Button>
          <Button className="reset" color="warning" onClick={reset}>
            {value === 0 ? (
              <SettingsIcon fontSize="large" />
            ) : (
              <RestartAltIcon fontSize="large" />
            )}
          </Button>
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
