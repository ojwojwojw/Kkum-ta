import React , {useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./signup.css";
import axios from 'axios';


const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const navigate = useNavigate()
  const [signupError , setSignupError] = useState(null);

  //회원가입 요청
  const submitSignUp = async () => {
    const userData = {
      "id" : username,
      "password" : password,
      "email" : email,
    };
    try{
      const res = await axios.post('https://i9c101.p.ssafy.io:8090/auth/signup',userData ,{  //배포를 위해서라도 프록시 설정 해야함.//배포용
      // const res = await axios.post('http://localhost:8090/auth/signup',userData ,{  //개발용.
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
      })
      navigate('/login') //로그인 페이지로 이동
      console.log(res.data)
    }
    catch(err){
     
      console.log(err)
      setSignupError("회원가입에 실패하였습니다.")
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>회원가입</h1>
        <form>
          <input
            className="signup-input"
            type="text"
            placeholder="아이디를 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          {signupError? <label style={{ color: 'red' }}>{signupError}</label> : null}
          <button 
            className="signup-button" 
            type="button"
            onClick={submitSignUp}>
            회원가입
          </button>
        </form>
        <br/>
        <div className="back-button">
          <Link to="/">숨기기</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
