import React from "react"
import { useState } from "react"
import axios from "axios"
import "./findPasswordPage.css"

const FindPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [verify, setVerify] = useState("")
    const [newPassword, setNewPassword] = useState("")

    //비밀번호 찾기 코드 전송
    const sendCode = async () => {
        const data = { "id": username, "email": email }
        try {
            const res = await axios.post('http://localhost:443/auth/email', data, {
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

    //비밀번호 코드 증명
    const veryfyCode = async () => {
        const data = { "email": email, "code": verify }
        try {
            const res = await axios.post('http://localhost:443/auth/verifycode', data, {
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

    //비밀번호 수정 
    const changePassword = async () => {
        const data = { "id": username, "email": email, "password": newPassword }
        console.log(data)
        try {
            // console.log(data)
            const res = await axios.put('http://localhost:443/auth/changePW', data, {
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
        <div className="find-password-container">
            <div className="find-password-form">
                <h1>이메일 코드 전송</h1>
                <input
                    className="find-password-input"
                    placeholder="유저 아이디를 입력하세요"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="find-password-input"
                    placeholder="이메일을 입력하세요"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="find-password-button" onClick={sendCode}>
                    이메일 코드 전송
                </button>

                <h1>코드 인증하기</h1>
                <input
                    className="find-password-input"
                    placeholder="이메일로 받은 코드를 입력하세요"
                    type="text"
                    value={verify}
                    onChange={(e) => setVerify(e.target.value)}
                />
                <button className="find-password-button" onClick={veryfyCode}>
                    증명하기
                </button>

                <h1>비밀번호 수정하기</h1>
                <input
                    className="find-password-input"
                    placeholder="수정할 비밀번호를 입력하세요"
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="find-password-button" onClick={changePassword}>
                    수정하기
                </button>
            </div>
        </div>
    );

}


export default FindPasswordPage





