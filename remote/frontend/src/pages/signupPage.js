import React , {useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./signup.css";
import axios from 'axios';


const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const navigate = useNavigate()

  //회원가입 요청
  const submitSignUp = async () => {
    const userData = {
      "id" : username,
      "password" : password,
      "email" : email,
    };
    try{
      const res = await axios.post('http://localhost:8090/auth/signup',userData ,{  //배포를 위해서라도 프록시 설정 해야함.
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
      })
      navigate('/login') //로그인 페이지로 이동
      console.log(res.data)
    }
    catch(err){
     
      console.log(err)
      console.log(userData)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>This is signup Page.</h1>
        <form>
          <input
            className="signup-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <button 
            className="signup-button" 
            type="button"
            onClick={submitSignUp}>
            Sign Up
          </button>
        </form>
        <div className="back-button">
          <Link to="/">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
