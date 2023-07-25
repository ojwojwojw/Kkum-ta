import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [timers, updateArr] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            await axios.get("/timer_table").then((res) => {
                updateArr(res.data);
            });
        };
        fetchDatas();

        return () => {
            console.log("cleanup");
        };
    }, []);

    return (
        <div>
          {
            timers.map((timer) => (
              <div>
                <div>이름 : {timer.timer_name}</div>
                <div>시작 시간 : {timer.start_time}</div>
                <div>종료 시간 : {timer.end_time}</div>
              </div>
            ))
          }
            ...
        </div>
    );
}

export default App;
