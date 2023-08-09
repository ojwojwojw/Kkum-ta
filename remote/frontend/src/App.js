import React, { useState } from "react";
import "./App.css";
import MenuListBar from "./components/MenuListBar";
// import Login from "./components/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Box, Grid, Button, Menu, MenuItem } from "@mui/material";
import ReportPage from "./pages/reportsPage";
import GroupPage from "./pages/groupPage";
import SignupPage from "./pages/signupPage";
import NavBar from "./components/navBar";


function App() {
  const [isAthenticated, setIsAthenticated] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
