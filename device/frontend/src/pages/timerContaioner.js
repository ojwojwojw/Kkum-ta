import React from "react";
import BasicTimerComponent from "../components/basicTimer/basicTimerComponent";
import {useSelector} from 'react-redux';

const TimerContainer = () => {
    let timerArray = useSelector( (state)=> {return state.timer.timerArray})

    return(
      <div>
        {timerArray.map((obj ,index) => {
            return(<BasicTimerComponent key={index} index={index}/>)
          }
        )}
      </div>

    )
}



export default TimerContainer