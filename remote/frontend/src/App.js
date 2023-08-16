import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MainPage from "./pages/mainPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <BrowserRouter>{isAuthenticated ? <NavBar /> : <MainPage />}</BrowserRouter>
    </div>
  );
}

export default App;
