import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import RefreshTimer from "./refreshTimer";
import { Button, Grid } from "@mui/material";

const RefreshTest = ({ setAccessToken }) => {
  const provider = useSelector((state) => state.auth.provider);
  const userId = useSelector((state) => state.auth.userName);
  const [resetTimer, setResetTimer] = useState(false); // 타이머 초기화 상태

  const refreshTokenTest = async () => {
    const data = { id: userId, provider: provider };

    try {
      const res = await axios.post(
        //배포용
        "https://i9c101.p.ssafy.io:443/auth/refresh",
        //개발용
        // "http://localhost:8090/auth/refresh",  
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      localStorage.removeItem("accessToken"); //로컬 스토리지 비우기
      localStorage.setItem("accessToken", res.data.accessToken); //로컬스토리지에 토큰 저장
      setAccessToken(res.data.accessToken);
      setResetTimer(true);
    } catch (err) {
      console.log(err);
      console.log(data);
    }
  };

  return (
    <Grid>
      <RefreshTimer
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
        refreshTokenTest={refreshTokenTest}
      />
    </Grid>
  );
};

export default RefreshTest;
