import React, { useEffect, useState } from "react";

import { Box, Button, Grid, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import TimerUpdateModal from "./timerUpdateModal";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

export default function BasicTimer({
  WatchId,
  updateTimer,
  deleteTimer,
  reload,
  time,
}) {
  const timerArray = useSelector((state) => state.timer.timerArray);

  // useEffect(()=>{
  //   setInput(5000)
  // },[timerArray])

  //타이머 랜더링 버그 fix
  useEffect(() => {
    setInput(time);
  }, [timerArray]);

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const [input, setInput] = useState(0);

  function update() {
    updateTimer(input, WatchId);
  }

  function delTimer() {
    deleteTimer(WatchId);
  }

  useEffect(() => {
    const hours =
      Math.floor(input / 3600000) > 0 ? Math.floor(input / 3600000) : 0;
    const minutes =
      Math.floor((input % 3600000) / 60000) > 0
        ? Math.floor((input % 3600000) / 60000)
        : 0;
    const seconds =
      Math.floor((input % 60000) / 1000) > 0
        ? Math.floor((input % 60000) / 1000)
        : 0;

    setHour(hours);
    setMin(minutes);
    setSec(seconds);
  }, [input]);

  return (
    <Box>
      <Grid
        container
        border={"6px solid #036"}
        sx={{
          width: "50dvw",
          height: "12dvw",
          m: "6px 0 6px",

          borderRadius: "10px",
          bgcolor: "white",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={10} sx={{ fontSize: "6dvw" }}>
          {String(hour).padStart(2, "0")} : {String(min).padStart(2, "0")} :{" "}
          {String(sec).padStart(2, "0")}
        </Grid>
        <Grid item xs={2}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <IconButton
              sx={{
                fontSize: "25px",
                color: "red",
                width: "4dvw",
                height: "4dvw",
                p: 0,
                m: 0,
              }}
              onClick={() => delTimer(WatchId)}
            >
              <CloseIcon sx={{ fontSize: "3dvw" }} />
            </IconButton>
            <TimerUpdateModal
              WatchId={WatchId}
              updateTimer={update}
              input={input}
              setInput={setInput}
              reload={reload}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
