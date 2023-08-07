import React ,{useState} from "react";
import { Box, Grid, Stack, Button, IconButton, Input } from "@mui/material";
import "./login.css";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setUserPassword] = useState("");
  const navigate = useNavigate();

  //로그인 요청
  const submitSignIn = async () => {
    const userData = {
      "id" : username,
      "pw" : password,
    };
    try{
      const res = await axios.get('http://localhost:8080/auth/signin',userData ,{  //배포를 위해서라도 프록시 설정 해야함.
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
      })
      console.log(res.data)
      

    }
    catch(err){
      console.log(err)
      console.log(userData)
    }
  }
  
  
  
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
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
                className="login-input"
                type="text"
                placeholder="PASSWORD"
                value = {password}
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

