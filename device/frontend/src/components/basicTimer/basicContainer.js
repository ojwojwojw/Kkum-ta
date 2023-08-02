import React, { useEffect, useRef, useState } from "react";

import BasicTimer from "../../utility/basic_timer";
import BasicStopwatch from "../../utility/basic_stopwatch";
import BasicTimerComponent from "./basicComponent";
import TransitionsModal from "./CreateModal";
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
      //timerList 빈 배열로 초기화
      timerList.map((obj)=>{
        obj.timer.pause()
      })
      timerList.splice(0, timerList.length);
      
      
      res.data.map((item, idx) => {
        console.log(`${idx} : ${item}`);
        const timer = new BasicTimer();
        timer.load(item);
        timerList.push({ "id": item.id, "type": item.type, "timer": timer });
        
      });

      setDummy((prev) =>prev + 1);
      
    } catch (error) {
      console.log("Error Occured During Fetch: ", error);
    }
  };

  const createTimer = async() => {
    try{
      const data = {type : "timer" , initTime : [0] , maxIter : 1}
      const res = await axios.post("timer/",data);
      console.log('res',res.data)
      load()
    }
    catch (error){
      console.log(error)
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={6}>
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
                load = {load}
              />
            );
          })}
        </Grid>
        <Grid item xs={2}>
          <Grid
            width={"140px"}
            height={"540px"}
            position={"fixed"}
            className="btn-controller"
            container
            direction={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack xs={8}>
              <Grid item>
                <TransitionsModal createWatch={createBasicWatch} />
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
                <Button
                  variant="outlined"
                  onClick={createTimer}
                >
                  타이머 생성(api)
                </Button>
              </Grid>
              {/* <Grid item>
                <Button
                  variant="outlined"
                  onClick={() =>
                    createBasicWatch((input.type = "stopWatch"), input.current)
                  }
                >
                  스톱워치 생성
                </Button>
              </Grid> */}
            </Stack>

            <Stack xs={1}>
              <Button variant="outlined" onClick={() => load()}>
                불러오기
              </Button>
              <Button variant="outlined" onClick={() => save()}>
                저장하기
              </Button>
            </Stack>
            <Stack xs={3}>
              <Grid item>
                <Button variant="outlined" onClick={() => allStart()}>
                  전체 시작
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => allPause()}>
                  전체 정지
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => allReset()}>
                  전체 초기화
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
