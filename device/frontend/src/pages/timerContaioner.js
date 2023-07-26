import React from "react";
import BasicTimerComponent from "../components/basicTimer/basicTimerComponent";
import {useSelector ,useDispatch} from 'react-redux';
import axios from "axios";
import { useState } from "react";
import { fetData } from "../features/timer/timerSlice";

const TimerContainer = () => {
    let timerArray = useSelector( (state)=> {return state.timer.timerArray})
    const dispatch = useDispatch()


    const [test , setTest] = useState([])

    const fetchData = async ()=> {
      const res = await axios.get('timer/Timer/All');
      setTest(res.data);
      dispatch(fetData(test))
      console.log(test)
    }



    return(
      <div>
        {timerArray.map((obj ,index) => {
            return(<BasicTimerComponent key={index} index={index}/>)
          }
        )}
        
        <button onClick={fetchData}>test</button>

      </div>

    )
}



export default TimerContainer