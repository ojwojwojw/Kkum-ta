import React, { useState, useEffect } from "react";

function RefreshTimer({ resetTimer, setResetTimer }) {
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
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1000);
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
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {formatTime(timeLeft)}
    </div>
  );
}

export default RefreshTimer;
