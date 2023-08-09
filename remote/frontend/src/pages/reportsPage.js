import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { BarChart, PieChart } from "@mui/x-charts";

export default function ReportPage() {
  const [handle, setHandle] = useState("day");
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const groundY = new Array(53).fill(0);
  const groundX = new Array(7).fill(0);

  // 날짜 구하기
  var date = new Date();
  var year = date.getFullYear();

  // 올해 1월1일을 가져오기
  var newYear = new Date(`${year}-01-01`);
  var newNextYear = new Date(`${year + 1}-01-01`);
  var dateOfYear = (newNextYear - newYear) / 1000 / 3600 / 24;

  return (
    <Box m={"20px"}>
      <Grid container>
        <Grid
          container
          border={"4px solid #acacac"}
          borderRadius={"10px"}
          minHeight={"220px"}
          m={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"white"}
        >
          <Grid item xs={2}>
            {/* 토글 버튼(일,주,월) */}
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton
                value="day"
                aria-label="day"
                onClick={() => setHandle("day")}
              >
                일간 : {"".padStart(2, "0")}시간
              </ToggleButton>
              <ToggleButton
                value="week"
                aria-label="week"
                onClick={() => setHandle("week")}
              >
                주간 : {"".padStart(2, "0")}시간
              </ToggleButton>
              <ToggleButton
                value="month"
                aria-label="month"
                onClick={() => setHandle("month")}
              >
                월간 : {"".padStart(2, "0")}시간
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={3}>
            {/* 버튼에 따른 그래프(barChart) */}
            {handle === "day" && (
              <Grid>
                <BarChart
                  series={[
                    {
                      data: [1, 2, 5, 3, 4, 1, 2],
                      stack: "A",
                      label: "공부",
                      color: "#003366",
                    },
                    {
                      data: [1, 2, 1, 1, 3, 2, 1],
                      stack: "A",
                      label: "휴식",
                      color: "#eaea66",
                    },
                  ]}
                  width={300}
                  height={250}
                />
              </Grid>
            )}
            {handle === "week" && (
              <Grid>
                <BarChart
                  series={[
                    {
                      data: [5, 3, 6, 4, 7, 1, 2],
                      stack: "A",
                      label: "공부",
                      color: "#003366",
                    },
                    {
                      data: [2, 1, 3, 1, 3, 1, 1],
                      stack: "A",
                      label: "휴식",
                      color: "#eaea66",
                    },
                  ]}
                  width={300}
                  height={250}
                />
              </Grid>
            )}
            {handle === "month" && (
              <Grid>
                <BarChart
                  series={[
                    {
                      data: [6, 2, 5, 3, 5, 1, 2],
                      stack: "A",
                      label: "공부",
                      color: "#003366",
                    },
                    {
                      data: [1, 2, 1, 1, 1, 2, 1],
                      stack: "A",
                      label: "휴식",
                      color: "#eaea66",
                    },
                  ]}
                  width={300}
                  height={250}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={3}>
            {/* 버튼에 따른 그래프(PieChart) */}
            {handle === "day" && (
              <Grid>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 10,
                          label: "공부 시간",
                          color: "#003366",
                        },
                        {
                          id: 1,
                          value: 6,
                          label: "휴식 시간",
                          color: "#eaea66",
                        },
                      ],
                    },
                  ]}
                  width={250}
                  height={200}
                />
              </Grid>
            )}
            {handle === "week" && (
              <Grid>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 20,
                          label: "공부 시간",
                          color: "#003366",
                        },
                        {
                          id: 1,
                          value: 16,
                          label: "휴식 시간",
                          color: "#eaea66",
                        },
                      ],
                    },
                  ]}
                  width={250}
                  height={200}
                />
              </Grid>
            )}
            {handle === "month" && (
              <Grid>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 50,
                          label: "공부 시간",
                          color: "#003366",
                        },
                        {
                          id: 1,
                          value: 36,
                          label: "휴식 시간",
                          color: "#eaea66",
                        },
                      ],
                    },
                  ]}
                  width={250}
                  height={200}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          container
          border={"4px solid #acacac"}
          borderRadius={"10px"}
          minHeight={"220px"}
          m={"10px"}
          p={"10px"}
          bgcolor={"white"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item mt="20px">
            <Stack direction={"row"}>
              {groundY.map((row, yIndex) => (
                <Stack key={yIndex}>
                  {groundX.map((col, xIndex) => {
                    const day = yIndex * 7 + xIndex + 1;
                    return day <= dateOfYear ? (
                      <Grid
                        key={xIndex + yIndex * 7 + 1}
                        sx={{
                          width: "13px",
                          height: "13px",
                          m: "2px",
                          opacity: `10%`,
                          border: "1px solid #0a0",
                          borderRadius: "2px",
                        }}
                        bgcolor={"#003366"}
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
