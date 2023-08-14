import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginState } from "../redux/authSlice";
import { useDispatch } from "react-redux";

function NaverCallback() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * @description 로그인하기
   */
  const fetchLogin = useCallback(
    async (code) => {
      try {
        const response = await axios.post(
          "https://i9c101.p.ssafy.io/auth/naver/login", // 배포용
          // "http://localhost:8090/auth/naver/login", // 개발용
          { code: code },
          {
            //배포를 위해서라도 프록시 설정 해야함.
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
          }
        );

        navigate("/"); // API 호출 성공 시 메인 페이지로 이동
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.accessToken); //로컬스토리지에 토큰 저장
        dispatch(
          loginState({
            id: response.data.user.id,
            provider: response.data.user.provider,
            email: null,
          })
        );
      } catch (error) {
        alert("Function fetchLogin error!");
        console.error(error);
      }
    },
    [navigate]
  );

  /**
   * @description login API fetch
   */
  useEffect(() => {
    if (code) {
      fetchLogin(code);
    }
  }, [code, fetchLogin]);

  /**
   * @description code 값 가져오기
   */
  useEffect(() => {
    const Address = new URL(window.location.href); // url 가져오기
    const code = Address.searchParams.get("code") || ""; // 👈 code value

    setCode(code);
  }, []);

  return <div className="App">Wait....</div>;
}

export default NaverCallback;
