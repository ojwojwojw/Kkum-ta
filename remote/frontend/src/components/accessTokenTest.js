import React from "react";
import axios from "axios";
import { useState } from "react";

const AccessTest = () => {
    const newData = localStorage.getItem("accessToken") 
    const [data, setData] = useState(newData)


    const accessTokenTest = async () => {
        try{
            const res = await axios.get('http://localhost:443/auth/check',{
                headers: {
                    Authorization: `Bearer ${data}` // 액세스 토큰을 Authorization 헤더에 설정하는 방법
                }
            })
            console.log(data)
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <button onClick={accessTokenTest}>엑세스 토큰 테스트</button>
        </div>
    )
}

export default AccessTest