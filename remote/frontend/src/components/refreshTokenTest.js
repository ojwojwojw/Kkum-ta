import React from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

const RefreshTest = () => {
    const provider = useSelector(state => state.auth.provider)
    const userId = useSelector(state => state.auth.userName)

    const refreshTokenTest = async () => {
        const data = { "id": userId, "provider": provider }

        try {
            const res = await axios.post('https://i9c101.p.ssafy.io:443/auth/refresh', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            })
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button onClick={refreshTokenTest}>리프래쉬 토큰 테스트</button>
        </div>
    )
}

export default RefreshTest