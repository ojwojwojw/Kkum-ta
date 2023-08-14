import React from "react";
import "./App.css";
import * as mqtt from "mqtt";

import GroupComponent from "./components/basicTimer/groupComponent";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import WifiIcon from "@mui/icons-material/Wifi";
import { IconButton } from "@mui/material";

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
          right: "13dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickWIFIButton}
      >
        <WifiIcon sx={{ fontSize: "10dvh" }} />
      </IconButton>
      <GroupComponent />
    </div>
  );
}

export default App;
