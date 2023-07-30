import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import BasicContainer from "./components/basicTimer/basicContainer";
import Page2 from "./pages/page2";

function App() {
  return (
    <div className="App">

      {/* <BasicContainer /> */}

      <Routes>
        <Route path="/" element={<BasicContainer />}></Route>
        <Route path="/2" element={<Page2 />}></Route>
      </Routes>
      <Link to="/"><li>루트</li></Link>
      <Link to="/2"><li>임시페이지</li></Link>
    </div>
  );
}

export default App;