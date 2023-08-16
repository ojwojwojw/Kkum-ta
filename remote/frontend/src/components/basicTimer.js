import React, { useEffect, useState } from "react";

import { Box, Grid, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import TimerUpdateModal from "./timerUpdateModal";

export default function BasicTimer({ WatchId,
  updateTimer,
  reload }) {

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const [input, setInput] = useState(0);

  function update() {
    updateTimer(input,WatchId)
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
        border={"6px solid #333"}
        sx={{
          width: "50dvw",
          height: "18dvh",
          m: "10px",
          borderRadius: "10px",
          fontSize: "11dvh",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={10}>
          {String(hour).padStart(2, "0")} : {String(min).padStart(2, "0")} :{" "}
          {String(sec).padStart(2, "0")}
        </Grid>
        <Grid item xs={2}>
          <TimerUpdateModal WatchId={WatchId}
            updateTimer={update}
            input={input}
            setInput={setInput}
            reload={reload} />
        </Grid>
      </Grid>
    </Box>
  );
}
