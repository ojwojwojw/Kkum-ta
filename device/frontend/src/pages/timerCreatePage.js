import React, { useState } from "react";
import { CreateTimer } from "../features/timer/timer";    



const TimerCreatePage = ({timer})=>{

    const [value, setValue] = useState(0)
    timer[0].setStateSetter(setValue);
    console.log(timer)


    return(
        <div>
            
            <div>
                <button onClick={() => {timer[0].isRunning ? timer[0].pause() : timer[0].start()}}> {value} </button>
                <button onClick={() => timer[0].reset(3 * 1000)}> reset </button>
            </div>   
            
        </div>
    )
}
export default TimerCreatePage

