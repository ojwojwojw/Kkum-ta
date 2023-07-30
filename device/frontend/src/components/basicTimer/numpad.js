import { Grid, Input } from "@mui/material";
import React from "react";

const Numpad = ({ input, setInput }) => {
  const handleButtonClick = (value) => {
    setInput(Number(String(input) + value));
  };

  return (
    <Grid container xs={20} justifyContent={"center"} alignContent={"center"}>
      <Grid item xs={20}>
        <span> {input} sec </span>
        <div>
          {[1, 2, 3, 4, 5].map((number) => (
            <button key={number} onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
        </div>
        <div>
          {[6, 7, 8, 9, 0].map((number) => (
            <button key={number} onClick={() => handleButtonClick(number)}>
              {number}
            </button>
          ))}
        </div>
        <div>
          <button onClick={() => setInput(Number(String(input).slice(0, -1)))}>
            지우기
          </button>
          <button onClick={() => setInput(Number(String(input).slice(0,-((String(input).length)))))}>
            리셋
          </button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Numpad;
