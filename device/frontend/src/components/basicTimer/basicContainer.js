import React, { useEffect, useRef, useState } from "react";

import BasicTimer from "../../utility/basic_timer";
import BasicStopwatch from "../../utility/basic_stopwatch";
import BasicTimerComponent from "./basicComponent";
import TransitionsModal from "./transitionsModal";
import axios from "axios";

import "./basicContainer.css";

import { Grid, Box, Stack, Button } from "@mui/material";

export default function TimerContainer({ timerList, id }) {
  const [_, setDummy] = useState(0); // 랜더링 강제로 일으키기 위해 사용
  const input = useRef(0);

  useEffect(() => {
    console.log("timer container constructor");
    return () => {
      console.log("timer container destructor");
    };
  }, []);

  // 타이머 스톱워치 생성 함수 리팩토링(중복 제거 후 타입으로 구분)
  function createBasicWatch(type, idx) {
    if (timerList.length >= 10) return;

    const newWatch = {
      id: Date.now(),
      type: type,
      timer: type === "timer" ? new BasicTimer() : new BasicStopwatch(),
    };
    // console.log(newWatch);
    setDummy((prev) => {
      timerList.splice(idx, 0, newWatch);
      return prev + 1;
    });
    return newWatch.id;
  }

  function remove(id) {
    if (timerList.length == 0) return;
    let deleteIdx = 0;
    timerList.forEach((obj, idx) => {
      if (obj.id === id) {
        deleteIdx = idx;
      }
    });

    setDummy((prev) => {
      timerList[deleteIdx].timer.pause(); // clearInterval 을 위해 반드시 호출 !!
      timerList.splice(deleteIdx, 1);
      return prev + 1;
    });
  }

  function save() {
    // time, init
    const arr = [];
    timerList.forEach((obj) => {
      const timer = obj.timer;
      const data = timer.save();
      data.type = obj.type;
      arr.push(data);
    });
    console.log(arr);
  }

  function allStart() {
    timerList.forEach(({ timer }) => timer.start());
  }

  function allPause() {
    timerList.forEach(({ timer }) => timer.pause());
  }

  function allReset() {
    timerList.forEach(({ timer }) => timer.reset());
  }

  //API 요청관련

  const load = async () => {
    try {
      const res = await axios.get("timer/");
      console.log("load");
      console.log(res.data);
      console.log(timerList);

      setDummy((prev) => {
        res.data.map((item, idx) => {
          console.log(`${idx} : ${item}`);
          const timer = new BasicTimer();
          timer.load(item);
          timerList.push({ id: Date.now(), type: "timer", timer: timer });
          return prev + 1;
        });
      });
    } catch (error) {
      console.log("Error Occured During Fetch: ", error);
    }
  };

  return (
    <Box className="time-container" sx={{ flexGrow: 1 }}>
      <Grid container justifyContent={"space-between"} sx={{ flexGrow: 1 }}>
        <Grid item xs={8}>
          {timerList.map((obj, idx) => {
            console.log(`timer ${idx}`);
            return (
              <BasicTimerComponent
                key={obj.id}
                timer={obj.timer}
                idx={idx}
                type={obj.type}
                removeTimer={remove}
                WatchId={obj.id}
                initTime={obj.initTime}
              />
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <Stack
            container
            top={"80px"}
            width={"140px"}
            height={"480px"}
            position={"fixed"}
            className="btn-controller"
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack xs={8}>
              <Grid item>
                <TransitionsModal type={"create"} />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() =>
                    createBasicWatch((input.type = "timer"), input.current)
                  }
                >
                  타이머 생성
                </Button>
              </Grid>
              <Grid item>
                {/* <Button
                  variant="outlined"
                  onClick={() =>
                    createBasicWatch((input.type = "stopWatch"), input.current)
                  }
                >
                  스톱워치 생성
                </Button> */}
              </Grid>
            </Stack>

            <Stack xs={2}>
              <Button variant="outlined" onClick={() => load()}>
                불러오기
              </Button>
              <Button variant="outlined" onClick={() => save()}>
                저장하기
              </Button>
            </Stack>
            <Stack xs={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => allStart()}
                >
                  전체 시작
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => allPause()}
                >
                  전체 정지
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
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
