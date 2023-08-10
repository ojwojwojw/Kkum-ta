import React, { useState } from "react";
import { Box, Grid, Stack, Button, IconButton, Input } from "@mui/material";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginState, logoutState } from "../redux/authSlice";
import FindPasswordPage from "../pages/findPasswordPage";
import { Route , Routes } from "react-router-dom";
import SignupPage from "../pages/signupPage";
//일단 loginPage에서 테스트 하는 기능들
// import AccessTest from "./accessTokenTest";
// import RefreshTest from "./refreshTokenTest";
// import FindPasswordPage from "../pages/findPasswordPage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setUserPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const newAccessToken = localStorage.getItem("accessToken")   //로컬스토리지에서 액세스 토큰 가져오기
  // const [accessToken, setAccessToken] = useState(newAccessToken)

  //로그인 요청
  const submitSignIn = async () => {
    const userData = {
      "id": username,
      "password": password,
    };
    try {
      const res = await axios.post('https://i9c101.p.ssafy.io:443/auth/signin', userData, {  //배포를 위해서라도 프록시 설정 해야함.
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true
      })
      console.log(res.data)
      localStorage.setItem("accessToken", res.data.accessToken); //로컬스토리지에 토큰 저장
      dispatch(loginState({
        "id": res.data.user.id,
        "provider": res.data.user.provider,
        "email": res.data.user.email,
        "password": password,
      })) //redux에 유저데이터 저장

      navigate('/')
    }
    catch (err) {
      console.log("occur error while login.", err)
      // console.log(userData)
    }
  }

  //sns 로그인 요청
  const googleSignIn = async () => {
    try {
      const res = await axios.get('https://i9c101.p.ssafy.io:443/auth/google' , {
        hearder : { 
          
        }
      })
      console.log(res.data)
    }
    catch (err) {
      console.log("occur error while google login.", err)
    }
  }
  
  const naverSignIn = async () => {
    const userData = {
      "id": username,
      "password": password,
    };
    try {
      const res = await axios.get('https://i9c101.p.ssafy.io:443/auth/naver', userData, {  //배포를 위해서라도 프록시 설정 해야함.
      })
      console.log(res.data)
      localStorage.setItem("accessToken", res.data.accessToken); //로컬스토리지에 토큰 저장
      dispatch(loginState({
        "id": res.data.user.id,
        "provider": res.data.user.provider,
        "email": res.data.user.email,
        "password": password,
      })) //redux에 유저데이터 저장

      navigate('/')
    }
    catch (err) {
      console.log("occur error while login.", err)
      // console.log(userData)
    }
  }

  const kakaoSignIn = async () => {
    const userData = {
      "id": username,
      "password": password,
    };
    try {
      const res = await axios.get('https://i9c101.p.ssafy.io:443/auth/signin', userData, {  //배포를 위해서라도 프록시 설정 해야함.
      })
      console.log(res.data)
      localStorage.setItem("accessToken", res.data.accessToken); //로컬스토리지에 토큰 저장
      dispatch(loginState({
        "id": res.data.user.id,
        "provider": res.data.user.provider,
        "email": res.data.user.email,
        "password": password,
      })) //redux에 유저데이터 저장

      navigate('/')
    }
    catch (err) {
      console.log("occur error while login.", err)
      // console.log(userData)
    }
  }


  // //로그아웃 요청 (nav바로 이동)
  // const submitSignout = async () => {

  //   const userData = {
  //     "id": username,
  //     "password": password,
  //   };
  //   try {
  //     const res = await axios.post('http://localhost:8090/auth/signout', userData, {  //배포를 위해서라도 프록시 설정 해야함.
  //       headers: {
  //         Authorization: `Bearer ${accessToken}` // 액세스 토큰을 Authorization 헤더에 설정하는 방법
  //       },
  //       withCredentials: true
  //     })
  //   localStorage.removeItem("accessToken");  //로컬 스토리지 비우기
  //   console.log(res.data) 
  //   dispatch(logoutState())  //redux state 반영하기
  //   }
  //     catch (err) {
  //     console.log(err)
  //   }
  // }


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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
                className="login-input"
                type="text"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setUserPassword(e.target.value)}
              ></Input>
            </Grid>
          </Grid>
          <Grid item xs={12} className="btn-form">
            <Grid item>
              <Button
                variant="contained"
                color="success"
                sx={{ minWidth: "200px", m: "4px", p: "6px" }}
                onClick={submitSignIn}
              >
                로그인
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link} to="/signup"
                variant="contained"
                sx={{ minWidth: "200px", m: "4px", p: "6px" }}
              >
                회원가입
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link} to="/findpassword"
                variant="contained"
                sx={{ minWidth: "200px", m: "4px", p: "6px" }}
              >
                비밀번호 찾기
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} className="btn-social-login">
            <IconButton
              variant="contained"
              sx={{ minWidth: "50px", minHeight: "50px", m: "4px", p: "6px" }}
              className="Google-login"
              edge={false}
              onClick={googleSignIn}
            >
              <img src={process.env.PUBLIC_URL + '/images/google-logo.png'} className="logo-img" alt="google-logo" />
            </IconButton>
            <IconButton
              variant="contained"
              sx={{ minWidth: "50px", minHeight: "50px", m: "4px", p: "6px" }}
              className="Naver-login"
              edge={false}
              onClick={naverSignIn}
            >
              <img src={process.env.PUBLIC_URL + '/images/naver-logo.png'} className="logo-img" alt="Naver-logo" />
            </IconButton>
            <IconButton
              variant="contained"
              sx={{ minWidth: "50px", minHeight: "50px", m: "4px", p: "6px" }}
              className="Kakao-login"
              onClick={kakaoSignIn}
              edge={false}
            >
              <img src={process.env.PUBLIC_URL + '/images/kakao-logo.png'} className="logo-img" alt="Kakao-logo" />
            </IconButton>
          </Grid>
        </Stack>
      </Grid>
      <Routes>
        <Route exact path="/" Component={""} />
        <Route exact path="/login" Component={""} />
        <Route exact path="/signup" Component={SignupPage} />
        <Route exact path="/findpassword" Component={FindPasswordPage} />
      </Routes>
    </Box>
  );
}

