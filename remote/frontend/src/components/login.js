import React from "react";
import { Box, Grid, Stack, Button, IconButton, Input } from "@mui/material";
import "./login.css";

export default function Login() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100dvh"}
    >
      <Grid
        container
        className="login-form"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack>
          <Grid item xs={12} className="input-form">
            <Grid item xs={12}>
              <Input
                className="login-input"
                type="text"
                placeholder="ID"
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
                className="login-input"
                type="text"
                placeholder="PASSWORD"
              ></Input>
            </Grid>
          </Grid>
          <Grid item xs={12} className="btn-form">
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ minWidth: "200px", m: "4px", p: "6px" }}
              >
                로그인
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ minWidth: "200px", m: "4px", p: "6px" }}
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} className="btn-social-login">
            <IconButton
              variant="contained"
              sx={{ minWidth: "50px",minHeight:"50px", m: "4px", p: "6px" }}
              className="Google-login"
              edge={false}
            >
              <img src={process.env.PUBLIC_URL + '/images/google-logo.png'} className="logo-img" alt="google-logo" />
            </IconButton>
            <IconButton
              variant="contained"
              sx={{ minWidth: "50px",minHeight:"50px", m: "4px", p: "6px" }}
              className="Naver-login"
              edge={false}
            >
              <img src={process.env.PUBLIC_URL + '/images/naver-logo.png'} className="logo-img" alt="Naver-logo" />
            </IconButton>
            <IconButton
              variant="contained"
              sx={{ minWidth: "50px",minHeight:"50px", m: "4px", p: "6px" }}
              className="Kakao-login"
              edge={false}
            >
              <img src={process.env.PUBLIC_URL + '/images/kakao-logo.png'} className="logo-img" alt="Kakao-logo" />
            </IconButton>
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
}
