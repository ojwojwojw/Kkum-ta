import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [timers, updateArr] = useState([]);
    const [logs, updateLog] = useState([]);

    useEffect(() => {
        const fetchDatas = () => {
            axios.get("/timer_table").then((res) => {
                updateArr(res.data);
            });
        };
        fetchDatas();

        return () => {
            console.log("cleanup");
        };
    }, []);

    const getLogs = async () => {
        try {
            const res = await axios.get("/timer_log");
            updateLog(res.data);
        } catch (error) {
            console.error("Error occured during get data: ", error);
        }
    };

    return (
        <div>
            <button onClick={getLogs}>click here!</button>
            {timers.map((timer) => (
                <div>
                    <div>이름 : {timer.timer_name}</div>
                    <div>시작 시간 : {timer.start_time}</div>
                    <div>종료 시간 : {timer.end_time}</div>
                </div>
            ))}

            {logs.map((item) => (
              <div key={item.timer_log_id}>{item.operation}</div>
            ))}
            ...
        </div>
    );
}

export default App;
