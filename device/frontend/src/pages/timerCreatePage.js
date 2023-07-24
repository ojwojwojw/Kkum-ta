import React, { useState } from "react";
    
const TimerCreatePage = ({timer})=>{

    const [value, setValue] = useState(0)
    timer.setStateSetter(setValue);

    return(
        <div>
            <button onClick={() => {timer.isRunning ? timer.pause() : timer.start()}}> {value} </button>
            <button onClick={() => timer.reset(3 * 1000)}> reset </button>
        </div>
    )
}
export default TimerCreatePage

