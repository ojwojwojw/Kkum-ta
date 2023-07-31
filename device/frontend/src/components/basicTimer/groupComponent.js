
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Page1 from "../../pages/page1";
import Page2 from "../../pages/page2";

import { useState } from "react";

import TimerContainer from "./basicContainer";


export default function GroupComponent() {
  
  const [containerList, setContainerList] = useState([<TimerContainer/>, <TimerContainer/>]);
  
  function add() {
    
  }

  function remove() {
    
  }

  return (
    <>
    {
      containerList.map((item) => {
        return item
      })
    }
    </>
  );
}