import React, { useEffect ,useState} from "react";
import { Box, Grid, Button } from "@mui/material";
import {IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { useParams } from "react-router-dom";
import BasicTimer from "../components/basicTimer";
import axios from "axios";
import { useSelector ,useDispatch } from "react-redux";
import { fetchData } from "../redux/timerSlice";
import UpdateModal from "./updateModal";
import "./groupPage.css";

export default function GroupPage() {
  const {key} = useParams() //그룹 번호를 라우팅 parmas로 받아옴
  const timerArray = useSelector(state =>state.timer.timerArray) //해당그룹페이지의 타이머 관리용 array
  const userName = useSelector(state => state.auth.userName) // 로그인한 유저 아이디
  const dispatch = useDispatch() //디스패치 선언
  // const [input, setInput] = useState(0) //타이머 시간 입력하는 용도

  //랜더링 관련
  useEffect(()=>{
    load()
  },[key])

  useEffect(()=>{
    
  },[timerArray])



  // api 요청 관련
  //로그인한 유저의 특정 그룹의 타이머 정보 조회
  const load = async () => {
    try {
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/timer/user/${userName}/${key}`) //배포용
      // const res = await axios.get(`http://localhost:8090/timer/user/${userName}/${key}`) //개발용
      console.log(res.data) //응답 확인
      dispatch(fetchData(res.data))
    }
    catch (err) {
      console.log(err)
    }
  }
  
  //타이머 생성
  const createTimer = async () => {
    const data = {
      "user_id" : userName ,
      "group_id" : key , 
      "initTime" : 10 , 
      "maxIter" : 1 
      }

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log(data)
    try {
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/timer`, data , config) //배포용
      // const res = await axios.post(`http://localhost:8090/timer`, data , config) //개발용
      console.log(res.data)
      load()
    }
    catch (err) {
      console.log(err)
    }
  }

  //타이머 삭제
  const deleteTimer = async (timer_id) => {
    try {
      console.log(timer_id)
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/${timer_id}`) //배포용
      // const res = await axios.delete(`http://localhost:8090/timer/${timer_id}`) //개발용
      console.log(res.data)
      load()
    }
    catch (err) {
      console.log(err)
    }
  }

  //타이머 수정 
  const updateTimer = async (input , timer_id) => {
    const data = {"initTime" : input}
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    try {
      console.log(timer_id)
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/${timer_id}`,data ,config) //배포용
      // const res = await axios.put(`http://localhost:8090/timer/${timer_id}`,data ,config) //개발용
      console.log(res.data)
      load()
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Box className="group">
      <Grid>
        <h1>{key}번그룹에 해당하는 타이머 컨테이너 표시할 곳</h1>
        {/* 타이머를 순회하며 출력 */}
        {timerArray.length > 0 ? (    
          // timerArray가 비어있을땐 map을 쓰면 에러가납니다
          timerArray.map((item) => (
            
            <div key={item.id}>
              <BasicTimer 
              time = {item.init_time} 
              WatchId={item.component_key}
              updateTimer={updateTimer}
              reload={load} />
              {/* <p>Component Key: {item.component_key}</p>
              <p>Init Time: {item.init_time}</p>
              <p>Max Iter: {item.maxIter}</p>
              <p>Group Key: {item.group_key}</p>
              <p>ID: {item.id}</p>
              <button onClick={() => deleteTimer(item.component_key)}>x(타이머삭제)</button>
              <UpdateModal
              WatchId={item.component_key}
              updateTimer={updateTimer}
              input={input}
              setInput={setInput}
              reload={load}
              /> */}
              <hr />
            </div>
          ))
        ) : (
          <p>타이머가 없습니다.</p>
        )}
      <button onClick={createTimer}>+(타이머생성)</button>
      </Grid>
    </Box>
  );
}
