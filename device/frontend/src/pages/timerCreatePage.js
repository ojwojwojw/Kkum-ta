import React, { useState, useRef } from "react";
import BasicTimer from "../timerTestDir/basic_timer";

function TimerCreatePage() {

    const [value, setValue] = useState(0);
    const refTimer = useRef(null);
    const refText = useRef(null);

    function resume() {
        if (refTimer.current === null) {
            refTimer.current = new BasicTimer("", setValue);
        }
        const timer = refTimer.current;
        timer.isRunning ? timer.pause() : timer.start();
    }

    function reset() {
        if (refTimer.current === null) {
            refTimer.current = new BasicTimer("", setValue);
        }
        const timer = refTimer.current;
        timer.reset(refText.current * 1000);
    }

    return (
        <div>
            <button onClick={resume}> {value} </button>
            <button onClick={reset}> reset </button>
            <input type="text"
                placeholder="타이머 시간 설정"
                onChange={(arg) => { refText.current = arg.target.value }}></input>
        </div>
    )
}
export default TimerCreatePage

