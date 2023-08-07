import React from "react";
import { Box, Grid, Stack } from "@mui/material";

export default function ReportPage() {
  const groundY = new Array(53).fill(0);
  const groundX = new Array(7).fill(0);

  // 날짜 구하기
  var date = new Date();
  var year = date.getFullYear();
  console.log(year);

  // 올해 1월1일을 가져오기
  var newDate = new Date(`${year}-01-01`);
  console.log(newDate);

  return (
    <Box m={"20px"}>
      <Grid container>
        <Grid
          item
          xs={8.2}
          border={"4px solid #acacac"}
          borderRadius={"10px"}
          minHeight={"220px"}
          m={"10px"}
          p={"10px"}
        >
          막대 그래프
          <p>일간 : {"".padStart(2, "0")}시간</p>
          <p>주간 : {"".padStart(2, "0")}시간</p>
          <p>월간 : {"".padStart(2, "0")}시간</p>
        </Grid>
        <Grid
          item
          xs={3.3}
          border={"4px solid #acacac"}
          borderRadius={"10px"}
          minHeight={"220px"}
          m={"10px"}
          p={"10px"}
        >
          원그래프
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          border={"4px solid #acacac"}
          borderRadius={"10px"}
          minHeight={"220px"}
          m={"10px"}
          p={"10px"}
        >
          잔디심을 곳
          <Grid
            container
            mt="20px"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack container direction={"vertical"}>
              {groundY.map((row, yIndex) => (
                <Stack container key={yIndex}>
                  {groundX.map((col, xIndex) => {
                    const day = yIndex * 7 + xIndex + 1;
                    return day <= 365 ? (
                      <Grid
                        key={xIndex + yIndex * 7 + 1}
                        sx={{
                          width: "13px",
                          height: "13px",
                          m: "2px",
                          opacity: `${Math.random() * 100}%`,
                          border: "1px solid #0a0",
                          borderRadius: "2px",
                        }}
                        bgcolor={"#00ee00"}
                      ></Grid>
                    ) : null;
                  })}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
