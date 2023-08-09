import React from "react"
import { useState } from "react"
import axios from "axios"

const FindPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")


    //비밀번호 찾기 코드 전송
    const sendCord = async () => {
        const data = { "id": username, "email": email }
        try {
            const res = await axios.post('http://localhost:8090/auth/email', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true
            })
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
            console.log(data)
        }
    }

    return (
        <div>
            <h1>비밀번호 찾기 페이지</h1>
            <input placeholder="유저 아이디를 입력하세요"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="이메일을 입력하세요"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendCord}>비밀번호 코드 전송</button>
        </div>
    )

}


export default FindPasswordPage






