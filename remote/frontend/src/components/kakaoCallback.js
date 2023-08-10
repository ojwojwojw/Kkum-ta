import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  /**
   * @description 로그인하기
   */
  const fetchLogin = useCallback(
    async (code) => {
      try {
        const response = await axios.post(
          "http://localhost:8090/auth/kakao/login",
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

export default KakaoCallback;
