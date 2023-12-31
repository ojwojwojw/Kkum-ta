import React, { useEffect, useState } from "react";
import BasicTimer from "../../utility/basic_timer";
import BasicTimerComponent from "./basicComponent";
import axios from "axios";
import "./basicContainer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  create,
  fetchData,
  isRunningFalse,
  isRunningTrue,
} from "../../redux/timerSlice";
import { Grid, Box, Stack, Button } from "@mui/material";
import StopwatchComponent from "./stopwatchComponent";

export default function TimerContainer({ id, text, isSilent }) {
  const dispatch = useDispatch();
  const storeTimerArray = useSelector((state) => state.timer.timerArray); //백엔드와 동기화 된 store의 timerArray를 해당 컴포넌트에 불러온다.

  const [isGroupRunning, setIsGroupRunning] = useState(false);

  useEffect(() => allPause(), [id]);

  useEffect(() => {
    // console.log("timer container constructor");
    // 0.1초 뒤에 load 함수 호출을 지연시킵니다.
    const timerId = setTimeout(() => {
      load();
    }, 1);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const groupRunning = storeTimerArray.some(
      (timer) => timer.isRunning === true
    );
    setIsGroupRunning(groupRunning);

    if (!groupRunning && isGroupRunning) {
      setIsGroupRunning(false);
    }
  }, [storeTimerArray, isGroupRunning, setIsGroupRunning]);

  async function synchroTimer() {
    const res = await axios.get("synchro")
    // console.log(res);
    // await load();
  }

  function allStart() {
    storeTimerArray.forEach((item) => {
      item.timer.start();
      dispatch(isRunningTrue(item.id));
    });
    storeTimerArray.forEach((timer) => logStart(timer.id));
  }

  function allPause() {
    storeTimerArray.forEach((item) => {
      item.timer.pause();
      dispatch(isRunningFalse(item.id));
    });
    storeTimerArray.forEach((timer) => logPause(timer.id));
  }

  function allReset() {
    storeTimerArray.forEach((item) => {
      item.timer.reset();
      dispatch(isRunningFalse(item.id));
    });
    storeTimerArray.forEach((timer) => logStop(timer.id));
    setTimeout(console.log(storeTimerArray), 100);
  }

  //API 요청관련

  //타이머 전체 read
  const load = async () => {
    try {
      const tempTimerList = [];
      const res = await axios.get(`timer/?group_id=${id}`);
      // console.log("load");
      res.data.map((item, idx) => {
        const timer = new BasicTimer();
        timer.load(item);
        tempTimerList.push({
          id: item.id,
          type: item.type,
          isRunning: item.isRunning,
          timer: timer,
          initTime: item.remainTime,
        });
        return null;
      });
      // console.log(tempTimerList);
      dispatch(fetchData(tempTimerList));
      // dispatch(forceRendering());
    } catch (error) {
      console.log("Error Occured During Fetch: ", error);
    }
  };

  //타이머 Create
  const createTimer = async () => {
    try {
      const data = { type: "timer", initTime: [0, 0], maxIter: 1 };
      const res = await axios.post(`timer/?group_id=${id}`, data);
      // console.log(res.data);
      const timer = new BasicTimer();
      dispatch(
        create({
          id: res.data.id,
          type: "timer",
          initTime: res.data.initTime,
          isRunning: false,
          timer: timer,
        })
      );
      // dispatch(forceRendering());
    } catch (error) {
      console.log(error);
    }
  };

  //타이머 전체 동작 로그 관련
  const logStart = async (timerId) => {
    try {
      const data = { operation: "start" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log start data on backend.", res.data);
      // dispatch(forceRendering());
    } catch (err) {
      console.log(err);
    }
  };

  const logPause = async (timerId) => {
    try {
      const data = { operation: "pause" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log pause data on backend.", res.data);
      // dispatch(forceRendering());
    } catch (err) {
      console.log(err);
    }
  };

  const logStop = async (timerId) => {
    try {
      const data = { operation: "stop" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log stop(reset) data on backend.", res.data);
      // dispatch(forceRendering());
    } catch (err) {
      console.log(err);
    }
  };

  // stopWatch 관련 로그 작성
  const logStopwatchStart = async (groupId) => {
    try {
      const data = { operation: "start" };
      const res = await axios.post(`stopwatch/operation/${groupId}`, data);
      // console.log("log stopwatch start data on backend", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logStopwatchPause = async (groupId) => {
    try {
      const data = { operation: "pause" };
      const res = await axios.post(`stopwatch/operation/${groupId}`, data);
      // console.log("log stopwatch Pause data on backend", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="time-container" sx={{ flexGrow: 1 }}>
      <StopwatchComponent
        groupId={id}
        isGroupRunning={isGroupRunning}
        setIsGroupRunning={setIsGroupRunning}
        storeTimerArray={storeTimerArray}
        logStopwatchStart={logStopwatchStart}
        logStopwatchPause={logStopwatchPause}
        text={text}
      />
      <Grid container justifyContent={"space-between"} sx={{ flexGrow: 1 }}>
        <Grid item xs={8}>
          {storeTimerArray.map((obj, idx) => {
            // console.log(`timer ${idx}`);
            return (
              <BasicTimerComponent
                key={obj.id}
                timer={obj.timer}
                idx={idx}
                type={obj.type}
                WatchId={obj.id}
                initTime={obj.initTime}
                load={load}
                isSilent={isSilent}
                groupId={id}
              />
            );
          })}
          {storeTimerArray.length < 10 && id === 0 && (
            <Grid item className="btn-create-timer">
              {/* {storeTimerArray.length < 10 && id === 0 && (
              <TransitionsModal
                input={timerInput}
                setInput={setTimerInput}
                createTimer={() => createTimer(timerInput, 1)}
              />
            )} */}
              <Button
                sx={{
                  width: "68dvw",
                  height: "5dvw",
                  ml: "2dvw",
                  mb: 2,
                  borderRadius: 4,
                  bgcolor: "#376f94",
                  color: "white",
                  fontSize: "3dvw",
                  pb: 0,
                }}
                onClick={createTimer}
              >
                createTimer
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item xs={4}>
          <Stack
            top={"80px"}
            width={"20dvw"}
            height={"82dvh"}
            position={"fixed"}
            className="btn-controller"
            direction={"column"}
            justifyContent={"flex-end"}
          >
            <Stack xs={2}>
              <Grid item>
              <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    right: "2dvw",
                    minWidth: "18dvw",
                    minHeight: "7dvw",
                    fontSize: "2.2dvw",
                    fontWeight: "bold",
                    borderRadius: "1.2dvw",
                    m: "0.8dvw",
                  }}
                  onClick={() => synchroTimer()}
                >
                  서버 동기화
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    right: "2dvw",
                    minWidth: "18dvw",
                    minHeight: "7dvw",
                    fontSize: "2.2dvw",
                    fontWeight: "bold",
                    borderRadius: "1.2dvw",
                    m: "0.8dvw",
                  }}
                  onClick={() => allStart()}
                >
                  전체 시작
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    right: "2dvw",
                    minWidth: "18dvw",
                    minHeight: "7dvw",
                    fontSize: "2.2dvw",
                    fontWeight: "bold",
                    borderRadius: "1.2dvw",
                    m: "0.8dvw",
                  }}
                  onClick={() => allPause()}
                >
                  전체 정지
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    right: "2dvw",
                    minWidth: "18dvw",
                    minHeight: "7dvw",
                    fontSize: "2.2dvw",
                    fontWeight: "bold",
                    borderRadius: "1.2dvw",
                    m: "0.8dvw",
                  }}
                  onClick={() => allReset()}
                >
                  전체 초기화
                </Button>
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
