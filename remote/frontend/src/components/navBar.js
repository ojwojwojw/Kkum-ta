import React, { useState } from "react";
import MenuListBar from "./MenuListBar";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Grid, Button, Menu, MenuItem } from "@mui/material";
import ReportPage from "../pages/reportsPage";
import GroupPage from "../pages/groupPage";
import Login from "./login";
import axios from 'axios'
import { useDispatch , useSelector} from "react-redux";
import { logoutState } from "../redux/authSlice";
import RefreshTest from "./refreshTokenTest";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const newAccessToken = localStorage.getItem("accessToken") 
  const [accessToken, setAccessToken] = useState(newAccessToken)
  const dispatch = useDispatch()
  const username = useSelector(state => state.auth.userName)
  const provider = useSelector(state => state.auth.provider)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //로그아웃 요청
  const submitSignout = async () => {
    const userData = {
      "id": username,
      "provider": provider,
    };
    try {
      const res = await axios.post('https://i9c101.p.ssafy.io:8090/auth/signout', userData, {  //배포를 위해서라도 프록시 설정 해야함. //배포용
      // const res = await axios.post('http://localhost:8090/auth/signout', userData, {  //개발용
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}` // 액세스 토큰을 Authorization 헤더에 설정하는 방법
        },
        withCredentials: true
      })
      localStorage.removeItem("accessToken");  //로컬 스토리지 비우기
      console.log(res.data)
      dispatch(logoutState())  //redux state 반영하기
    }
    catch (err) {
      console.log(err)
      console.log(username,provider,accessToken)
      localStorage.removeItem("accessToken");  //로컬 스토리지 비우기
      dispatch(logoutState())  //redux state 반영하기
      navigate('/')
      //redirect to '/'
    }
  }

  return (
    <Box>
      <Grid
        container
        position={"fixed"}
        className="navbar"
        justifyContent={"center"}
        alignItems={"center"}
        height={"60px"}
        zIndex={100}
      >
        <Grid item xs={2}>
          <Link to="/">
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
              <img style={{width:"45px", margin:"0px 8px 0px"}} src="/images/kkumta-logo.png"></img>
              <div style={{fontSize:"30px", color:"#003366", fontFamily:"Nanum Gothic", fontWeight:"bolder"}} className="icon-description">꿈타</div>
            </div>
            </Link>
        </Grid>
        <Grid item xs={9}>
          <RefreshTest
          setAccessToken = {setAccessToken}
          />
        </Grid>
        <Grid item xs={1}>
          {/* 개발의 편의성을 위해 놓아뒀던 login 버튼 */}
          {/* <Link to="/login" Component={Login}>
            Login
          </Link> */}
          <Button
            id="user-button"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disableRipple={true}
            sx={{color:"black", fontSize:"20px", fontWeight:600}}
          >
          <Grid style={{display:"flex", alignItems:"center"}}> <div>{username}</div>{!anchorEl?<ExpandMoreIcon/>:<ExpandLessIcon/>}</Grid>
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "user-button",
            }}
          >
            <MenuItem onClick={handleClose}>MyPage</MenuItem>
            <MenuItem onClick={submitSignout}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid
        container
        position={"absolute"}
        top={"53px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <MenuListBar />
        <Grid item xs={10}>
          <Routes>
            <Route exact path="/" Component={""} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/reports" Component={ReportPage} />
            <Route exact path="/group/:key" Component={GroupPage} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
}
