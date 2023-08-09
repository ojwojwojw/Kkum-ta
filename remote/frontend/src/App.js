import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/login";

function App() {
  const [isAthenticated, setIsAthenticated] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>{isAthenticated ? <NavBar /> : <Login />}</BrowserRouter>
    </div>
  );
}

export default App;
