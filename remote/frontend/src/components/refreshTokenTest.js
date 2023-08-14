import React from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

const RefreshTest = () => {
    const provider = useSelector(state => state.auth.provider)
    const userId = useSelector(state => state.auth.userName)

    const refreshTokenTest = async () => {
        const data = { "id": userId, "provider": provider }

        try {
            const res = await axios.post('http://localhost:8090/auth/refresh', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
            console.log(res.data)
            localStorage.removeItem("accessToken");  //로컬 스토리지 비우기
            localStorage.setItem("accessToken", res.data.accessToken); //로컬스토리지에 토큰 저장
        }
        catch (err) {
            console.log(err)
            console.log(data)
        }
    }

    return (
        <div>
            자동 로그아웃 시간 
            <button onClick={refreshTokenTest}>연장하기</button>
        </div>
    )
}

export default RefreshTest