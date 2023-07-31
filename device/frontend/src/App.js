import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, RouterProvider } from 'react-router-dom';

import GroupComponent from "./components/basicTimer/groupComponent";

function App() {
  return (
    <div className="App">
      <GroupComponent />
    </div>
  );
}

export default App;
