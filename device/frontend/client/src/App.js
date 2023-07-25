import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [arr, updateArr] = useState([]);
    const callApi = async () => {
        await axios.get("/").then((res) => {
            console.log(res);
        });
    };

    const showTable = async () => {
        await axios.get("/timer_table").then((res) => {
            return res;
        });
    };

    useEffect(() => {
      console.log(showTable());
    }, []);

    return (
        <div>
          
            ...
        </div>
    );
}

export default App;
