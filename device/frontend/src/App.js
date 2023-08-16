import React, { useState } from "react";
import "./App.css";
import * as mqtt from "mqtt";

import GroupComponent from "./components/basicTimer/groupComponent";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import WifiIcon from "@mui/icons-material/Wifi";
import { IconButton, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import axios from "axios";

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
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [devKey, setDevKey] = useState("인터넷 연결을 확인하세요");
  const modalOpen = async () => {
    try{
      const res = await axios.get("dev");
      setDevKey(res.data.id);
      setDeviceModalOpen(true);
    } catch(e){
      console.log("err:", e);
    }
  }
  const modalClose = () => setDeviceModalOpen(false);

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
          right: "1dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickOffButton}
      >
        <PowerSettingsNewIcon sx={{ fontSize: "5dvw", color: "red" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "fixed",
          height: "14dvh",
          width: "7dvw",
          top: "4dvh",
          right: "8dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={onClickWIFIButton}
      >
        <WifiIcon sx={{ fontSize: "5dvw" }} />
      </IconButton>
      <IconButton
        sx={{
          position: "fixed",
          height: "14dvh",
          width: "7dvw",
          top: "4dvh",
          right: "15dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={toggleSilent}
      >
        {!isSilent ? (
          <NotificationsIcon sx={{ fontSize: "5dvw" }} />
        ) : (
          <NotificationsOffIcon sx={{ fontSize: "5dvw" }} />
        )}
      </IconButton>
      
      <IconButton
        sx={{
          position: "fixed",
          height: "14dvh",
          width: "7dvw",
          top: "4dvh",
          right: "22dvw",
          zIndex: 9999,
          color: "black",
        }}
        onClick={modalOpen}
      >
          <InfoIcon sx={{ fontSize: "5dvw"}}/>
      </IconButton>
      <GroupComponent isSilent={isSilent} />
      
      <Modal
        open={deviceModalOpen}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40dvw",
          backgroundColor: "#EEE",
          borderRadius: "1dvw",
          boxShadow: "24",
        }}>
          <Typography variant="h2"
          sx={{
            marginTop: "1dvw",
            marginLeft: "1dvw",
            marginBottom: "10px",
            fontWeight: "400"
          }}>
            디바이스 키
          </Typography>
          <Divider />
          <Typography variant="h3"
          sx={{
            margin: "1dvw",
            fontWeight: "400",
            display: "flex",
            flexDirection:"row",
            alignItems: "center"
          }}>
            <InfoIcon sx={{ fontSize: "2.5dvw", marginRight: "0.5dvw"}}/>
            {devKey}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
