import React, { useState } from "react";
import BasicTimer from "../timerTestDir/basic_timer";
    
const TimerCreatePage = ()=>{

    const [value, setValue] = useState(0)

    const t1 = new BasicTimer("t1", setValue);
    

    return(
        <div>
            <button onClick={() => t1.start()}> Data : {value} </button>
            <button onClick={() => t1.reset(3 * 1000)}> Data : {value} </button>
        </div>
    )
}
export default TimerCreatePage


//


