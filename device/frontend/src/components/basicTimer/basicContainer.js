import React, { useEffect , useState} from "react";
import BasicTimer from "../../utility/basic_timer";
import BasicTimerComponent from "./basicComponent";
import TransitionsModal from "./CreateModal";
import axios from "axios";
import "./basicContainer.css";
import { useDispatch , useSelector } from "react-redux";
import { create , fetchData ,forceRendering} from "../../redux/timerSlice";
import { Grid, Box, Stack, Button } from "@mui/material";




export default function TimerContainer({ timerList, id }) {
  const dispatch = useDispatch()
  const storeTimerArray = useSelector((state) => state.timer.timerArray) //백엔드와 동기화 된 store의 timerArray를 해당 컴포넌트에 불러온다.

  useEffect(() => {
    console.log("timer container constructor");
    return () => {
      console.log("timer container destructor");
    };
  }, []);

  
  
 

  
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
    storeTimerArray.forEach((timer)=> logStart(timer.id))
  }

  function allPause() {
    storeTimerArray.forEach(({ timer }) => timer.pause());
    storeTimerArray.forEach((timer)=> logPause(timer.id))
  }

  function allReset() {
    storeTimerArray.forEach(({ timer }) => timer.reset());
    storeTimerArray.forEach((timer)=> logStop(timer.id))

  }

  //API 요청관련

  //타이머 전체 read
  const load = async () => {
    try {
      const tempTimerList = []
      const res = await axios.get("timer/");
      console.log("load");
      res.data.map((item, idx) => {
        
        const timer = new BasicTimer();
        timer.load(item);
        tempTimerList.push({ "id": item.id, "type": item.type, "timer": timer });
        return null
      });   
      dispatch(fetchData(tempTimerList))
      dispatch(forceRendering())
    } catch (error) {
      console.log("Error Occured During Fetch: ", error);
    }
  };
  

  //타이머 Create
  const createTimer = async() => {
    try{
      const data = {type : "timer" , initTime : [0] , maxIter : 1}
      const res = await axios.post("timer/",data);
      const timer = new BasicTimer();
      dispatch(create({"id": res.data.id, "type": "timer", "timer": timer }))
      dispatch(forceRendering())
    }
    catch (error){
      console.log(error)
    }
  }


  //타이머 전체 동작 로그 관련
  const logStart = async(timerId) => {
    try{
      const data = {operation : "start"}
      const res = await axios.post(`timer/operation/${timerId}`,data)
      console.log("log start data on backend." , res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const logPause = async(timerId) => {
    try{
      const data = {operation : "pause"}
      const res = await axios.post(`timer/operation/${timerId}`,data)
      console.log("log pause data on backend." , res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const logStop = async(timerId) => {
    try{
      const data = {operation : "stop"}
      const res = await axios.post(`timer/operation/${timerId}`,data)
      console.log("log stop(reset) data on backend." , res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={6}>
          {storeTimerArray.map((obj, idx) => {
            console.log(`timer ${idx}`);
            return (
              <BasicTimerComponent
                key={obj.kkk}
                timer={obj.timer}
                idx={idx}
                type={obj.type}
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
                <TransitionsModal createWatch={createTimer} />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={createTimer}
                >
                  타이머 생성
                </Button>
              </Grid>
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
