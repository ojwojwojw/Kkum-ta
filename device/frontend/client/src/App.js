import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [arr, updateArr] = useState();

    useEffect(() => {
      let completed = false;
        const fetchDatas = async () => {
            const result = await axios.get("/timer_table");
            if(!completed) updateArr(result.data);
        };
        fetchDatas();
        console.log(arr);
    }, []);

    return <div></div>;
}

export default App;
