import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import TimerContainer from "./basicContainer";


export default function GroupComponent() {

  const [timerArrayList, setTimerArrayList] = useState([]);

  useEffect(() => {
    console.log("group constructor");

    return () => {
      console.log("group destructor");
    };
  }, []);

  function add() {

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

  function remove() {

  }

  return (
    <>
      <button onClick={() => add()}> create group </button>
      {
        timerArrayList.map((_, idx) => {
          console.log(timerArrayList);
          return (
            <Link key={idx} to={`/${idx}`}><li>{`${idx} 번`}</li></Link>
          );
        })
      }
      <Routes>
        {
          timerArrayList.map((obj, idx) => {
            return (
              <Route key={obj.id}
                path={`/${idx}`}
                element={<TimerContainer
                  key={obj.id}
                  id={obj.id}
                  timerList={obj.timerList}
                ></TimerContainer>}></Route>
            );
          })
        }
      </Routes>
    </>
  );
}