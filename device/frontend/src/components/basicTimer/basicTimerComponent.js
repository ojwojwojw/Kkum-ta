import React, { useState, useEffect } from "react";

// mui
import Grid from "@mui/material/Grid";
import "./basicTimer.css";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

function BasicTimerComponent({ timer, idx }) {

  const [value, setTime] = useState(0);

  useEffect(() => {
    console.log("basic timer componenet constructor");
    timer.setTime = setTime;
    timer.reset(idx * 10 * 1000);

    return (() => {
      timer.pause();
      console.log("basic timer componenet destructor");
    });
  }, []);

  function resume() {
    timer.isRunning() ? timer.pause() : timer.start();
  }

  function reset(time) {
    timer.reset(time);
  }

  return (
    <Grid container justifyContent={"center"} alignContent={"center"}>
      {idx}
      <Grid item xs={6} className="time">
        {("00" + Math.floor(value / 1000 / 3600)).slice(-2)}:{" "}
        {("00" + Math.floor(value / 1000 / 60)).slice(-2)} :{" "}
        {("00" + Math.floor((value / 1000) % 60)).slice(-2)}
        <span className="micro">
          {("00" + Math.floor(((value / 1000) % 1) * 100)).slice(-2)}
        </span>
      </Grid>
      <Grid item xs={4} className="timerButton">
        <Button className="start" onClick={() => resume()}>
          {1 ? (
            <PlayArrowIcon fontSize="large" />
          ) : (
            <PauseIcon fontSize="large" />
          )}
        </Button>
        <Button className="reset" color="warning" onClick={() => reset()}>
            {value === 0 ? (
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
