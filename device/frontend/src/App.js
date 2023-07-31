import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import BasicContainer from "./components/basicTimer/basicContainer";
import Page2 from "./pages/page2";
import Page1 from "./pages/page1";

function App() {
  return (
    <div className="App">

      <BasicContainer />
    </div>
  );
}

export default App;