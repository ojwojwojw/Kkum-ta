import React from "react"
import { useState } from "react"
import axios from "axios"
import "./findPasswordPage.css"
import { Link } from "react-router-dom"

const FindPasswordPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [verify, setVerify] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [success1, setSuccess1] = useState(null)
    const [success2, setSuccess2] = useState(null)
    const [success3, setSuccess3] = useState(null)
    const [message1, setMessage1] = useState(null)
    const [message2, setMessage2] = useState(null)
    const [message3, setMessage3] = useState(null)


    //비밀번호 찾기 코드 전송
    const sendCode = async () => {
        const data = { "id": username, "email": email }
        try {
            const res = await axios.post('http://localhost:8090/auth/email', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true
            })
            console.log(res.data)
            setSuccess1(true)
            setMessage1("인증코드 전송에 성공하였습니다.")
        }
        catch (err) {
            console.log(err)
            console.log(data)
            setSuccess1(false)
            setMessage1("인증코드 전송에 실패하였습니다.")
        }
    }

    //비밀번호 코드 증명
    const veryfyCode = async () => {
        const data = { "email": email, "code": verify }
        try {
            const res = await axios.post('http://localhost:8090/auth/verifycode', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true
            })
            console.log(res.data)
            setSuccess2(true)
            setMessage2("인증코드 증명에 성공하였습니다.")
        }
        catch (err) {
            console.log(err)
            console.log(data)
            setSuccess2(false)
            setMessage2("인증코드 증명에 실패하였습니다.")
        }
    }

    //비밀번호 수정 
    const changePassword = async () => {
        const data = { "id": username, "email": email, "password": newPassword }
        console.log(data)
        try {
            // console.log(data)
            const res = await axios.put('http://localhost:8090/auth/changePW', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true
            })
            console.log(res.data)
            setSuccess3(true)
            setMessage3("비밀번호 수정에 성공하였습니다.")

        }
        catch (err) {
            console.log(err)
            console.log(data)
            setSuccess3(false)
            setMessage3("비밀번호 수정에 실패하였습니다.")
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
                {success1 ? <label style={{ color: 'blue' }}>{message1}</label> : null}
                {success1 ? null : <label style={{ color: 'red' }}>{message1}</label>}
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
                {success2 ? <label style={{ color: 'blue' }}>{message2}</label> : null}
                {success2 ? null : <label style={{ color: 'red' }}>{message2}</label>}
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
                {success3 ? <label style={{ color: 'blue' }}>{message3}</label> : null}
                {success3 ? null : <label style={{ color: 'red' }}>{message3}</label>}
                <button className="find-password-button" onClick={changePassword}>
                    수정하기
                </button>
                <br />
                <div className="back-button">
                    <Link to="/">숨기기</Link>
                </div>
            </div>

        </div>
    );

}


export default FindPasswordPage






