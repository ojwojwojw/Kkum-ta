import React, { useState ,useEffect } from "react";
import TimerManager from "../timerTestDir/timer_manager";
    
const TimerCreatePage = ()=>{

    const tm = new TimerManager();
    const t1 = tm.createBaiscTimer("t1");
    t1.reset(3 * 1000).start();

    const [input , setInput] = useState(0)
    
    // useEffect(() => {
    //     setTime(t1.dt);
    // }, [t1.dt]);


    const handleInputChange = (e) => {
        setInput(e);
    }



    return(
        <div>
    
            <input type="text" value={t1.dt} onChange={handleInputChange}/>
            <h4>Data : {t1.dt}</h4>

        </div>

    )
}
export default TimerCreatePage


//


