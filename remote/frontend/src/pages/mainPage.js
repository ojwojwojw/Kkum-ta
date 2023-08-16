import React from "react";
import "./mainPage.css";
import { Route, Routes } from "react-router-dom";
import FindPasswordPage from "./findPasswordPage";
import SignupPage from "./signupPage";
import KakaoCallback from "../components/kakaoCallback";
import GoogleCallback from "../components/googleCallback";
import NaverCallback from "../components/naverCallback";
import Login from "../components/login";
import { Box, Grid, Typography } from "@mui/material";

export default function MainPage() {
  return (
    <Box minHeight={"100dvh"} minWidth={"100dvw"} className="main-page">
      <Grid
        className="app-info"
        sx={{
          position: "absolute",
          top: "48%",
          left: "73%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "40px",
            fontFamily: "Nanum Gothic",
            fontWeight: "bold",
            color: "#000",
            minWidth: "500px",
          }}
        >
          꿈을 이뤄주는 타이머
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: "70px",
            fontFamily: "Nanum Gothic",
            fontWeight: "bolder",
            paddingLeft: "40px",
            paddingTop: "20px",
            color: "#020716",
            minWidth: "500px",
          }}
        >
          꿈타.
        </Typography>
      </Grid>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/signup" Component={SignupPage} />
        <Route exact path="/findpassword" Component={FindPasswordPage} />
        <Route path="callback/kakao" element={<KakaoCallback />} />
        <Route path="callback/google" element={<GoogleCallback />} />
        <Route path="callback/naver" element={<NaverCallback />} />
      </Routes>
    </Box>
  );
}
