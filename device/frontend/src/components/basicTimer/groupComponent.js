import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import TimerContainer from "./basicContainer";

// mui
import { Tabs } from "@mui/material";

export default function GroupComponent() {
  const [timerArrayList, setTimerArrayList] = useState([]);

  useEffect(() => {
    console.log("group constructor");

    fetch('http://localhost:3000/hello.txt')
      .then(response => response.text())
      .then(data => {
        console.log(data); // This will log the file's content to the console
      })
      .catch(error => {
        console.error('Error fetching the file:', error);
      });


    return () => {
      console.log("group destructor");
    };
  }, []);

  function add() {
    if (timerArrayList.length > 5) return;
    const newArray = {
      id: Date.now(), // 그룹 아이디
      timerList: new Array(0),
    };

    setTimerArrayList((prevList) => {
      const newList = [...prevList];
      newList.push(newArray);
      return newList;
    });
  }


  function remove() {}
  

  return (
    <>
      <button onClick={() => add()}> create group </button>
      <Tabs className="custom-tabs">
        {timerArrayList.map((_, idx) => {
          console.log(timerArrayList);
          return (
            <Link key={idx} to={`/${idx}`}>
              <li>{`Group ${idx}`}</li>
            </Link>
          );
        })}
      </Tabs>
      <Routes>
        {timerArrayList.map((obj, idx) => {
          return (
            <Route
              key={obj.id}
              path={`/${idx}`}
              element={
                <TimerContainer
                  key={obj.id}
                  id={obj.id}
                  timerList={obj.timerList}
                ></TimerContainer>
              }
            ></Route>
          );
        })}
      </Routes>
    </>
  );
}
