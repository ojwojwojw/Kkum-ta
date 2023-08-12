import React, { useEffect, useState, useRef } from "react";
import { forceRendering } from "../../redux/timerSlice";
import { useDispatch } from "react-redux";
import TimerContainer from "./basicContainer";
import * as mqtt from 'mqtt'

// mui
import { Box, Grid, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function GroupComponent() {
  const [timerArrayList, setTimerArrayList] = useState([]);
  const mqttNode = useRef(null);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const handelChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let client = mqttNode.current;
    if(client == null) {
      client = mqtt.connect('ws://localhost:1884');
      client.on("connect", () => {
        console.log("connected");
        client.subscribe("test")
        setInterval(() => {
          console.log("pub");
          client.publish("kmg", "zzzzzzzz")
        }, 1000)
      });
      client.on("message", (topic, message) => {
        console.log(message.toString());
      });
    }

    return () => {
      console.log("disconnected");
      client.end()
    };
  }, []);

  function add(idx) {
    if (timerArrayList.length > 4) return;
    const newArray = {
      // id: Date.now() + idx, // 그룹 아이디
      id: idx, // 그룹 아이디
      timerList: new Array(0),
    };

    setTimerArrayList((prevList) => {
      const newList = [...prevList];
      newList.push(newArray);
      return newList;
    });

    dispatch(forceRendering());
  }

  for (let i = 0; i < 5; i++) {
    add(i);
  }

  return (
    <Box>

      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handelChange}
            aria-label="Group tabs"
          // indicatorColor="none"
          >
            {timerArrayList.map((_, idx) => (
              <Tab key={idx} label={`Group ${idx + 1}`} {...a11yProps(idx)} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {timerArrayList.map((obj, idx) => (
            <CustomTabPanel key={obj.id} value={value} index={idx}>
              <TimerContainer
                key={obj.id}
                id={obj.id}
                timerList={obj.timerList}
              ></TimerContainer>
            </CustomTabPanel>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
