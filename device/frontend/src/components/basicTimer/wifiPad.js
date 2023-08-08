import React from "react";
import axios from "axios";

const WifiPad = () => {
    
    const wifiRequest = async () => {
        try {
            const res = await axios.get(`/keyboard`);
            console.log("요청 성공.",res.data)
        }catch (err){
            console.log("occuring error while request Wifi. ",err)
        }

    }

    return(
        <div>
            <button onClick={wifiRequest}>Wi-Fi 연결요청</button>
        </div>
    )
}

export default WifiPad