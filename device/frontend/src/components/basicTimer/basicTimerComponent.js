import { useDispatch } from "react-redux";

import React, { useState, useRef} from "react";
import React, { useState, useRef } from "react";
import BasicTimer from "../../utility/basic_timer";
import { logPauseData } from "../../features/timer/timerSlice";
import { selectingTimer } from "../../features/numberpad/numberPadSlice";

// mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./basicTimer.css";


import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";

function useConstructor(callBack = () => {}) {
  const flag = useRef(false);
  if (flag.current) return;
  callBack();
  flag.current = true;
}

function BasicTimerComponent(props) {
  const [input, setInput] = useState(0);
  const [value, setValue] = useState(0);
  const refTimer = useRef(null);
  const dispatch = useDispatch();
  const selectedIndex = props.index;

  useConstructor(() => {
    refTimer.current = new BasicTimer("", setValue);
  });

  function resume() {
    const timer = refTimer.current;
    timer.isRunning() ? timer.pause() : timer.start();

    const payload = { dt: timer.getTime(), index: selectedIndex };
    dispatch(logPauseData(payload));
  }

  function reset(time = null) {
    console.log(time)
    const timer = refTimer.current;
    timer.reset(time);
  }

  return ( 
    <Box className="timer" onClick = {()=>{dispatch(selectingTimer(selectedIndex))}}>   
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={6} className="time">
          {("00" + Math.floor(value / 1000 / 3600)).slice(-2)}:{" "}
          {("00" + Math.floor(value / 1000 / 60)).slice(-2)} :{" "}
          {("00" + Math.floor((value / 1000) % 60)).slice(-2)}
          <span className="micro">
            {("00" + Math.floor(((value / 1000) % 1) * 100)).slice(-2)}
          </span>
        </Grid>
        <Grid item xs={4} className="timerButton">
          <Button className="start" onClick={resume}>
            {1 ? (
              <PlayArrowIcon fontSize="large" />
            ) : (
              <PauseIcon fontSize="large" />
            )}
          </Button>
          <Button className="reset" color="warning" onClick={() => reset(input*1000)}>
            {value === 0 ? (
              <SettingsIcon fontSize="large" />
            ) : (
              <RestartAltIcon fontSize="large" />
            )}
          </Button>
        </Grid>
        
        <Grid>
          <div>
            <div>
              {input} sec
            </div>
            <div>
              <button onClick={()=> setInput(Number(String(input) + '1'))}>1</button>
              <button onClick={()=> setInput(Number(String(input) + '2'))}>2</button>
              <button onClick={()=> setInput(Number(String(input) + '3'))}>3</button>
              <button onClick={()=> setInput(Number(String(input) + '4'))}>4</button>
              <button onClick={()=> setInput(Number(String(input) + '5'))}>5</button>
            </div>
            <div>
              <button onClick={()=> setInput(Number(String(input) + '6'))}>6</button>
              <button onClick={()=> setInput(Number(String(input) + '7'))}>7</button>
              <button onClick={()=> setInput(Number(String(input) + '8'))}>8</button>
              <button onClick={()=> setInput(Number(String(input) + '9'))}>9</button>
              <button onClick={()=> setInput(Number(String(input) + '0'))}>0</button>
            </div>
            <div>
              <button onClick={()=> setInput(Number(String(input).slice(0,-1)))}>취소</button>
              <button onClick={() => reset(input*1000)}>입력</button>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          
          
        </Grid>
          
      </Grid>
       
      
    </Box>
  );
}
export default BasicTimerComponent;
