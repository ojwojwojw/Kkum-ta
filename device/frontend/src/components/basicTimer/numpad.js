import { Button, Grid, Input, Stack } from "@mui/material";
import React from "react";

const Numpad = ({ input, setInput }) => {
  const handleButtonClick = (value) => {
    setInput(Number(String(input) + value));
  };

  return (
    <Grid
      fontSize={"16px"}
      container
      xs={24}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Stack container>
        <span> {input} sec </span>
        <div>
          {[1, 2, 3].map((number) => (
            <Button
              variant="outlined"
              sx={{
                p: 0,
                fontWeight: 600,
                minWidth: 40,
                minHeight: 32,
                border: "1px solid ",
                backgroundColor: "white",
                opacity: "80%",
              }}
              size="small"
              key={number}
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </Button>
          ))}
        </div>
        <div>
          {[4, 5, 6].map((number) => (
            <Button
              variant="outlined"
              sx={{
                p: 0,
                fontWeight: 600,
                minWidth: 40,
                minHeight: 32,
                border: "1px solid ",
                backgroundColor: "white",
                opacity: "80%",
              }}
              size="small"
              key={number}
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </Button>
          ))}
        </div>
        <div>
          {[7, 8, 9].map((number) => (
            <Button
              variant="outlined"
              sx={{
                p: 0,
                fontWeight: 600,
                minWidth: 40,
                minHeight: 32,
                border: "1px solid ",
                backgroundColor: "white",
                opacity: "80%",
              }}
              size="small"
              key={number}
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </Button>
          ))}
        </div>
        <div>
          <Button
            variant="outlined"
            sx={{
              p: 0,
              fontWeight: 600,
              minWidth: 40,
              minHeight: 32,
              border: "1px solid ",
              backgroundColor: "white",
              opacity: "80%",
            }}
            size="small"
            onClick={() => setInput(Number(String(input).slice(0, -1)))}
          >
            지우기
          </Button>
          <Button
            variant="outlined"
            sx={{
              p: 0,
              fontWeight: 600,
              minWidth: 40,
              minHeight: 32,
              border: "1px solid ",
              backgroundColor: "white",
              opacity: "80%",
            }}
            size="small"
            onClick={() => handleButtonClick(0)}
          >
            {0}
          </Button>
          <Button
            variant="outlined"
            sx={{
              p: 0,
              fontWeight: 600,
              minWidth: 40,
              minHeight: 32,
              border: "1px solid ",
              backgroundColor: "white",
              opacity: "80%",
            }}
            size="small"
            onClick={() =>
              setInput(Number(String(input).slice(0, -String(input).length)))
            }
          >
            리셋
          </Button>
        </div>
      </Stack>
    </Grid>
  );
};

export default Numpad;
