import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import TimerContainer from "./basicContainer";

// mui
import { Box, Grid, Tabs } from "@mui/material";

export default function GroupComponent() {
  const [timerArrayList, setTimerArrayList] = useState([]);

  useEffect(() => {
    console.log("group constructor");

    return () => {
      console.log("group destructor");
    };
  }, []);

  function add() {
    if (timerArrayList.length > 4) return;
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

  for (let i = 0; i < 5; i++) {
    add();
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          {/* <Button variant="outlined" size="large" onClick={() => add()}>
            create group
          </Button> */}

          <Tabs className="custom-tabs">
            {timerArrayList.map((_, idx) => {
              console.log(timerArrayList);
              return (
                <Link key={idx} to={`/${idx}`}>
                  <li>{`Group ${idx + 1}`}</li>
                </Link>
              );
            })}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
