import React from "react";
import "./App.css";
import * as mqtt from 'mqtt'

import GroupComponent from "./components/basicTimer/groupComponent";
import { Height } from "@mui/icons-material";

function onClickWIFIButton() {
  // const client = mqtt.connect('ws://192.168.100.245:1884');
  const client = mqtt.connect('ws://localhost:1884');
  client.on("connect", () => {
    console.log("connected")
    client.publish("wifi", "on")
  });
}

function onClickOffButton() {
  // const client = mqtt.connect('ws://192.168.100.245:1884');
  const client = mqtt.connect('ws://localhost:1884');
  client.on("connect", () => {
    console.log("connected")
    client.publish("shutdown", "off")
  });
}

function App() {

  return (
    <div className="App">
      <button onClick={onClickOffButton} style={{height: "50px"}}>전원 끄자</button>
      <button onClick={onClickWIFIButton} style={{height: "50px"}}>WIFI 연결 하자</button>
      <GroupComponent />
    </div>
  );
}

export default App;
