import React, { useState } from "react";
import "./App.css";
import * as mqtt from "mqtt";

import GroupComponent from "./components/basicTimer/groupComponent";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import WifiIcon from "@mui/icons-material/Wifi";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

function onClickWIFIButton() {
  // const client = mqtt.connect("ws://192.168.100.245:1884");
  const client = mqtt.connect("ws://localhost:1884");
  client.on("connect", () => {
    console.log("connected");
    client.publish("wifi", "on");
  });
}

function onClickOffButton() {
  // const client = mqtt.connect("ws://192.168.100.245:1884");
  const client = mqtt.connect("ws://localhost:1884");
  client.on("connect", () => {
    console.log("connected");
    client.publish("shutdown", "off");
  });
}

function App() {
  const [isSilent, setIsSilent] = useState(false);

  function toggleSilent() {
    isSilent ? setIsSilent(false) : setIsSilent(true);
  }

  return (
    <div className="App">
      <IconButton
        sx={{
          position: "fixed",
          height: "14dvh",
          width: "7dvw",
          top: "4dvh",
          right: "4dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickOffButton}
      >
        <PowerSettingsNewIcon sx={{ fontSize: "10dvh", color: "red" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "fixed",
          height: "14dvh",
          width: "7dvw",
          top: "4dvh",
          right: "11dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickWIFIButton}
      >
        <WifiIcon sx={{ fontSize: "10dvh" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "fixed",
          height: "14dvh",
          width: "7dvw",
          top: "4dvh",
          right: "19dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={toggleSilent}
      >
        {!isSilent ? (
          <NotificationsIcon sx={{ fontSize: "10dvh" }} />
        ) : (
          <NotificationsOffIcon sx={{ fontSize: "10dvh" }} />
        )}
      </IconButton>

      <GroupComponent isSilent={isSilent} />
    </div>
  );
}

export default App;
