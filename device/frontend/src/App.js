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
          height: "6dvw",
          width: "6dvw",
          top: "2dvw",
          right: "2dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickOffButton}
      >
        <PowerSettingsNewIcon sx={{ fontSize: "6dvw", color: "red" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "fixed",
          height: "6dvw",
          width: "6dvw",
          top: "2dvw",
          right: "10dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickWIFIButton}
      >
        <WifiIcon sx={{ fontSize: "6dvw" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "fixed",
          height: "6dvw",
          width: "6dvw",
          top: "2dvw",
          right: "18dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={toggleSilent}
      >
        {!isSilent ? (
          <NotificationsIcon sx={{ fontSize: "6dvw" }} />
        ) : (
          <NotificationsOffIcon sx={{ fontSize: "6dvw" }} />
        )}
      </IconButton>

      <GroupComponent isSilent={isSilent} />
    </div>
  );
}

export default App;
