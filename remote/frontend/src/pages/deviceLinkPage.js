import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import axios from "axios";
import { linkDevice } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Input } from "@mui/material";
import { border, borderBottom } from "@mui/system";

const DeviceLinkPage = () => {
  const user_id = useSelector((state) => state.auth.userName);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const newData = localStorage.getItem("accessToken");
  const [tokenData, setTokenData] = useState(newData);
  const navigate = useNavigate();

  //자동으로 디바이스 등록여부 확인하는 함수 실행
  useEffect(() => {
    IsDeviceLinked();
  }, []);

  //디바이스와 웹 연동
  const linkToDevice = async () => {
    const data = {
      device_serial: input,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`, // 액세스 토큰을 Authorization 헤더에 설정하는 방법
      },
    };

    try {
      const res = await axios.patch(
        `https://i9c101.p.ssafy.io:8090/dev/user/${user_id}`,
        data,
        config
      ); //배포용
      //   const res = await axios.patch(`http://localhost:8090/dev/user/${user_id}`, data, config ); //
      console.log(res.data);
      dispatch(linkDevice(true)); //redux에 반영
      navigate("/reports"); // navigate 실행
    } catch (err) {
      console.log(err);
    }
  };

  //백엔드로부터 연동 여부 확인받기 (디바이스 키 조회)
  const IsDeviceLinked = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`, // 액세스 토큰을 Authorization 헤더에 설정하는 방법
      },
    };
    try {
      const res = await axios.get(
        `https://i9c101.p.ssafy.io:8090/dev/user/${user_id}`,
        config
      ); //배포용
      //   const res = await axios.get(`http://localhost:8090/dev/user/${user_id}`, config); //
      console.log(res.data);
      dispatch(linkDevice(true)); //redux에 반영
      navigate("/reports"); // navigate 실행
    } catch (err) {
      console.log(err);
      dispatch(linkDevice(false)); //redux에 반영
      console.log(tokenData);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        minWidth: "100dvw",
        minHeight: "100dvh",
        paddingRight: "40%" ,//디바이스키 입력창 가운데 정렬
        paddingBottom: "15%" ,//디바이스키 입력창 가운데 정렬
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="디바이스 키를 입력해주세요."
        sx={{
          marginRight : "10px",
          minWidth: "300px",
          p: "20px",
          fontSize: "20px",
          bgcolor: "#fff",
          borderRadius: "15px",
        }}
        disableUnderline={"true"}
      />
      <Button
        sx={{ p: "20px", 
              fontSize: "20px", 
              fontWeight: 600, 
              color: "white" ,
              bgcolor: "#003366",
              borderRadius: "10px", 
            }}
        onClick={linkToDevice}
      >
        등록하기
      </Button>
      {/* <button onClick={IsDeviceLinked}>디바이스 등록여부 확인</button> */}
    </Grid>
  );
};

export default DeviceLinkPage;
