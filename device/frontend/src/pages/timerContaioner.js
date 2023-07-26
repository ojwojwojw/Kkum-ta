import React from "react";
import BasicTimerComponent from "../components/basicTimer/basicTimerComponent";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { fetData } from "../features/timer/timerSlice";

const TimerContainer = () => {
    let timerArray = useSelector((state) => {
        return state.timer.timerArray;
    });
    const dispatch = useDispatch();

    const [test, setTest] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get("timer/Timer/All");
            setTest(res.data);
        } catch(error) {
          console.log("Error Occured During Fetch: ", error);
        }
    };

    useEffect(() => {
      dispatch(fetData(test));
    }, [test])

    return (
        <div>
            {timerArray.map((obj, index) => {
                return <BasicTimerComponent key={index} index={index} />;
            })}

            <button onClick={fetchData}>test</button>
        </div>
    );
};

export default TimerContainer;
