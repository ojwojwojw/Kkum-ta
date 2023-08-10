import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/login";
import kakao from "./components/kakaoCallback";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <BrowserRouter>{isAuthenticated ? <NavBar /> : <Login />}</BrowserRouter>
    </div>
  );
}

export default App;
