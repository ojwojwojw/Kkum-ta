import React, { useState } from "react";
import "./App.css";
import CustomTabPanel from "./components/CustomTabPanel";
import Login from "./components/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [isAthenticated, setIsAthenticated] = useState(true);
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Main</Link>
        <Link to="/login">Login</Link>
        <Routes>
          <Route exact path="/" Component={!isAthenticated ? Login : CustomTabPanel}></Route>
          <Route exact path="login" Component={Login}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
