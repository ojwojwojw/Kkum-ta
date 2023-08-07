import React, { useEffect, useState } from "react";
import BasicTimer from "../../utility/basic_timer";
import BasicTimerComponent from "./basicComponent";
import TransitionsModal from "./CreateModal";
import axios from "axios";
import "./basicContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { create, fetchData, forceRendering } from "../../redux/timerSlice";
import { Grid, Box, Stack, Button } from "@mui/material";

export default function TimerContainer({ timerList, id }) {
  const dispatch = useDispatch();
  const storeTimerArray = useSelector((state) => state.timer.timerArray); //백엔드와 동기화 된 store의 timerArray를 해당 컴포넌트에 불러온다.
  const [timerInput,setTimerInput] = useState(0);
  const [click, setClick] = useState(0);

  useEffect(() => {
    console.log("timer container constructor");
    return () => {
      console.log("timer container destructor");
    };
  }, []);

  useEffect(() => {
    console.log("timer container constructor");
    // 0.1초 뒤에 load 함수 호출을 지연시킵니다.
    const timerId = setTimeout(() => {
      load();
    }, 100);

    return () => {
      console.log("timer container destructor");
      // 컴포넌트가 0.1초 전에 언마운트되었다면 타이머를 클리어합니다.
      clearTimeout(timerId);
    };
  }, []);


  useEffect(() => {
    console.log("timer container useEffect storeTimerArray");
    forceAllStart();
  }, [storeTimerArray]); // storeTimerArray가 변경될 때마다 forceAllStart 호출

  // useEffect(()=>{
  //   const groupRender = setTimeout(()=>{
  //     forceAllStart();
  //   },1000)

  //   return () =>{
  //     clearTimeout(groupRender)
  //   }
  // },[])

  

 
  // // 타이머 스톱워치 생성 함수 리팩토링(중복 제거 후 타입으로 구분)
  // function createBasicWatch(type, idx) {
  //   if (timerList.length >= 10) return;

  //   const newWatch = {
  //     id: Date.now(),
  //     type: type,
  //     timer: type === "timer" ? new BasicTimer() : new BasicStopwatch(),
  //   };
  //   // console.log(newWatch);
  //   setDummy((prev) => {
  //     timerList.splice(timerList.length, 0, newWatch);
  //     return prev + 1;
  //   });
  //   return newWatch.id;
  // }

  function remove(id) {
    if (timerList.length === 0) return;
    let deleteIdx = 0;
    timerList.forEach((obj, idx) => {
      if (obj.id === id) {
        deleteIdx = idx;
      }
    });

    //   setDummy((prev) => {
    //     timerList[deleteIdx].timer.pause(); // clearInterval 을 위해 반드시 호출 !!
    //     timerList.splice(deleteIdx, 1);
    //     return prev + 1;
    //   });
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
    storeTimerArray.forEach(({ timer }) => timer.start());
    storeTimerArray.forEach((timer) => logStart(timer.id));
  }

  function allPause() {
    storeTimerArray.forEach(({ timer }) => timer.pause());
    storeTimerArray.forEach((timer) => logPause(timer.id));
  }

  function allReset() {
    storeTimerArray.forEach(({ timer }) => timer.reset());
    storeTimerArray.forEach((timer) => logStop(timer.id));
  }

  //그룹이동 랜더링 관련
  function forceAllStart() {
    storeTimerArray.forEach((item) => {
      if(item.isRunning === true){
        console.log('조건문 안에 들어오나?')
        item.timer.pause()
        item.timer.start()
      }
    });

    dispatch(forceRendering());
  }

  //API 요청관련

  //타이머 전체 read
  const load = async () => {
    try {
      const tempTimerList = [];
      const res = await axios.get(`timer/?group_id=${id}`);
      console.log("load");
      res.data.map((item, idx) => {
        const timer = new BasicTimer();
        timer.load(item);
        tempTimerList.push({"id": item.id, "type": item.type, isRunning : item.isRunning ,"timer": timer });
        return null
      });   
      console.log(tempTimerList)
      dispatch(fetchData(tempTimerList))
      dispatch(forceRendering())
    } catch (error) {
      console.log("Error Occured During Fetch: ", error);
    }
  };

  //타이머 Create
  const createTimer = async (initTime, maxIter) => {
    try {
      const data = { type: "timer", initTime: [initTime], maxIter: maxIter };
      const res = await axios.post(`timer/?group_id=${id}`, data);
      console.log(res.data);
      const timer = new BasicTimer(initTime={initTime});
      dispatch(create({"id": res.data.id, "type": "timer", isRunning: false ,"timer": timer }))
      dispatch(forceRendering())
    }
    catch (error){
      console.log(error)
    }
  };

  //타이머 전체 동작 로그 관련
  const logStart = async (timerId) => {
    try {
      const data = { operation: "start" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log start data on backend.", res.data);
      dispatch(forceRendering());
    } catch (err) {
      console.log(err);
    }
  };

  const logPause = async (timerId) => {
    try {
      const data = { operation: "pause" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log pause data on backend.", res.data);
      dispatch(forceRendering());
    } catch (err) {
      console.log(err);
    }
  };

  const logStop = async (timerId) => {
    try {
      const data = { operation: "stop" };
      const res = await axios.post(`timer/operation/${timerId}`, data);
      console.log("log stop(reset) data on backend.", res.data);
      dispatch(forceRendering());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="time-container" sx={{ flexGrow: 1 }}>
      <Grid
        container
        className={click % 20 === 0 && click !== 0 ? "img-bomb" : ""}
        position={"sticky"}
        ml={"32px"}
        mb={"10px"}
        width={766}
        height={60}
        bgcolor={"#003366"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        zIndex={4}
        fontSize={"1.3rem"}
        onClick={() => {
          setClick(click + 1);
        }}
      >
        <p>{`지금까지 공부한 시간 :  00:00:00`}</p>
      </Grid>
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
              />
            );
          })}
          {storeTimerArray.length < 10 && (
            <Button
              variant="contained"
              className="btn-create-timer"
              sx={{
                width: "770px",
                ml: "30px",
                mb: 2,
                borderRadius: 4,
                bgcolor: "#376f94",
                fontSize: 30,
                pb: 0,
              }}
              onClick={createTimer}
            >
              +
            </Button>
          )}
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
                <TransitionsModal input={timerInput} setInput={setTimerInput} createTimer={createTimer} />
              </Grid>
              <Grid item></Grid>
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
