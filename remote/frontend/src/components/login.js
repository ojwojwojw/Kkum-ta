import React, { useState } from "react";
import { Box, Grid, Stack, Button, IconButton, Input } from "@mui/material";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginState } from "../redux/authSlice";
import FindPasswordPage from "../pages/findPasswordPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/signupPage";
import KakaoCallback from "./kakaoCallback";
import GoogleCallback from "./googleCallback";
import NaverCallback from "./naverCallback";
import Typography from '@mui/material/Typography';


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

    //오류 메시지 관련
    const [loginError, setLoginError] = useState(null);

    //로그인 요청
    const submitSignIn = async () => {
        const userData = {
            id: username,
            password: password,
        };
        try {
            const res = await axios.post(
                "https://i9c101.p.ssafy.io:8090/auth/signin", // 배포용
                // "http://localhost:8090/auth/signin",     //개발용
                userData,
                {
                    //배포를 위해서라도 프록시 설정 해야함.
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    withCredentials: true,
                }
            );
            console.log(res);
            localStorage.setItem("accessToken", res.data.accessToken); //로컬스토리지에 토큰 저장
            dispatch(
                loginState({
                    id: res.data.user.id,
                    provider: res.data.user.provider,
                    email: res.data.user.email,
                })
            ); //redux에 유저데이터 저장
            navigate("/devicelink");
        } catch (err) {
            console.log("occur error while login.", err);
            setLoginError("로그인에 실패하였습니다.");
            // console.log(userData)
        }
    };

    const googleURL = async () => {
        try {
            const { url } = await (
                await fetch("https://i9c101.p.ssafy.io:8090/auth/google/url")
            ) // 배포용
                // const { url } = await (
                //     await fetch("http://localhost:8090/auth/google/url")
                // ) // 개발용
                .json();

            console.log(url); // 응답으로 온 url
            document.location.href = url;
        } catch (error) {
            alert("Function fetchGetURL error!");
            console.error(error);
        }
    };

    const kakaoURL = async () => {
        try {
            const { url } = await (
                await fetch("https://i9c101.p.ssafy.io:8090/auth/kakao/url")
            ) // 배포용
            // const { url } = await (
            //     await fetch("http://localhost:8090/auth/kakao/url")
            // ) // 개발용
                .json();

            console.log(url); // 응답으로 온 url
            document.location.href = url;
        } catch (error) {
            alert("Function fetchGetURL error!");
            console.error(error);
        }
    };

    const naverURL = async () => {
        try {
            const { url } = await (
                await fetch("https://i9c101.p.ssafy.io:8090/auth/naver/url")
            ) // 배포용
            // const { url } = await (
            //     await fetch("http://localhost:8090/auth/naver/url")
            // ) // 개발용
                .json();

            console.log(url); // 응답으로 온 url
            document.location.href = url;
        } catch (error) {
            alert("Function fetchGetURL error!");
            console.error(error);
        }
    };

    // //로그아웃 요청 (nav바로 이동)
    // const submitSignout = async () => {

    //엔터 입력관련
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            submitSignIn();
        }
    };

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
            minHeight={"100dvh"}
            minWidth={"100dvw"}
            className="login-page"
        >
            <Grid
                className="app-info"
                sx={{
                    position: "absolute",
                    top: "48%",
                    left: "70%",
                    transform: "translate(-50%, -50%)",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "left"
                }}
            >
                <Typography variant="h2" sx={{
                    fontSize: "40px",
                    fontFamily:"Nanum Gothic",
                    fontWeight: "bold",
                    color: "#000",
                    minWidth: "500px"
                }}>
                    꿈을 이뤄주는 타이머
                </Typography>
                <Typography variant="h1" sx={{
                    fontSize: "70px",
                    fontFamily: "Nanum Gothic",
                    fontWeight: "bolder",
                    paddingLeft: "40px",
                    paddingTop: "20px",
                    color: "#020716",
                    minWidth: "500px"
                }}>
                    꿈타.
                </Typography>
            </Grid>
            <Grid
                container
                className="login-form"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "35%",
                    transform: "translate(-50%, -50%)",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Stack>
                    <Grid item xs={12} className="input-form">
                        <Grid item xs={12}>
                            <Input
                            minWit
                                className="login-input"
                                type="text"
                                placeholder="ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{minWidth:"300px", minHeight:"40px", marginBottom:"20px", fontSize:"18px"}}
                            ></Input>
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                            minWit
                                className="login-input"
                                type="password"
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) =>
                                    setUserPassword(e.target.value)
                                }
                                onKeyDown={(e) => activeEnter(e)}
                                sx={{minWidth:"300px", minHeight:"40px", marginBottom:"20px", fontSize:"18px"}}
                            ></Input>
                            <Grid>
                                {loginError ? (
                                    <label style={{ color: "red" }}>
                                        {loginError}
                                    </label>
                                ) : null}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="btn-form">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ width: "100%", m: "4px", p: "8px", mb:"14px", fontSize:"20px" }}
                                onClick={submitSignIn}
                            >
                                로그인
                            </Button>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                <Button
                                    to="/signup"
                                    variant="contained"
                                    sx={{ width: "100%", m: "4px", p: "8px", mb:"14px", fontSize:"20px" }}
                                >
                                    회원가입
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/findpassword">
                                <Button
                                    to="/findpassword"
                                    variant="contained"
                                    sx={{ width: "100%", m: "4px", p: "8px", mb:"14px", fontSize:"20px" }}
                                >
                                    비밀번호 찾기
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="btn-social-login">
                        <IconButton
                            variant="contained"
                            sx={{
                                minWidth: "50px",
                                minHeight: "50px",
                                m: "4px",
                                p: "6px",
                            }}
                            className="Google-login"
                            edge={false}
                            onClick={googleURL}
                        >
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/google-logo.png"
                                }
                                className="logo-img"
                                alt="google-logo"
                            />
                        </IconButton>
                        <IconButton
                            variant="contained"
                            sx={{
                                minWidth: "50px",
                                minHeight: "50px",
                                m: "4px",
                                p: "6px",
                            }}
                            className="Naver-login"
                            edge={false}
                            onClick={naverURL}
                        >
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/naver-logo.png"
                                }
                                className="logo-img"
                                alt="Naver-logo"
                            />
                        </IconButton>
                        <IconButton
                            variant="contained"
                            sx={{
                                minWidth: "50px",
                                minHeight: "50px",
                                m: "4px",
                                p: "6px",
                            }}
                            className="Kakao-login"
                            onClick={kakaoURL}
                            edge={false}
                        >
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/kakao-logo.png"
                                }
                                className="logo-img"
                                alt="Kakao-logo"
                            />
                        </IconButton>
                    </Grid>
                </Stack>
            </Grid>
        </Box>
    );
}
