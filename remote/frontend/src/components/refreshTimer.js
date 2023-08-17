import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

function RefreshTimer({ resetTimer, setResetTimer, refreshTokenTest }) {
  const initialTime = 30 * 60 * 1000; // 30분을 밀리초로 변환
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (resetTimer) {
      // resetTimer가 true일 때만 타이머를 초기화
      setTimeLeft(initialTime);
      setResetTimer(false); // 초기화가 완료되면 다시 false로 변경
    }
  }, [resetTimer, initialTime, setResetTimer]);

  useEffect(() => {
    // 타이머 카운트 다운 로직
    const interval = setInterval(async () => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1000);
      } else if(timeLeft === 0) {
        const res = await axios.post(
          "https://i9c101.p.ssafy.io/auth/signout",
          {})
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function refresh() {
    refreshTokenTest();
  }

  return (
    <div
      style={{
        display: "flex",
        color: "#888",
        justifyContent: "center",
        alignContent: "center",
        
      }}
    >
      <Button
        onClick={() => {
          refresh();
        }}
        sx={{ color: "#666", fontWeight: "bolder", fontFamily: "Nanum Gothic", fontSize: "1dvw", }}
      >
        자동 로그아웃 : {formatTime(timeLeft)} 연장하기
      </Button>
    </div>
  );
}

export default RefreshTimer;
