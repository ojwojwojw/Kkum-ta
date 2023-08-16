import React from "react";
import { Route, Routes } from "react-router-dom";
import FindPasswordPage from "./findPasswordPage";
import SignupPage from "./signupPage";
import KakaoCallback from "../components/kakaoCallback";
import GoogleCallback from "../components/googleCallback";
import NaverCallback from "../components/naverCallback";
import Login from "../components/login";

export default function MainPage() {
  return (
    <Routes>
      <Route exact path="/" Component={Login} />
      <Route exact path="/signup" Component={SignupPage} />
      <Route exact path="/findpassword" Component={FindPasswordPage} />
      <Route path="callback/kakao" element={<KakaoCallback />} />
      <Route path="callback/google" element={<GoogleCallback />} />
      <Route path="callback/naver" element={<NaverCallback />} />
    </Routes>
  );
}
