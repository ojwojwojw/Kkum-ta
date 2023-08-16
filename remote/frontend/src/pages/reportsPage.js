import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import "./reportPage.css";

import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";

export default function ReportPage() {
  const [handle, setHandle] = useState("week");
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  //2023년 조회 데이터가 바로 뜨게끔 
  useEffect(()=>{
    yearCheck(2023)
  },[])

  //api 요청시 필요한 데이터
  const user_id = useSelector((state) => state.auth.userName);
  const [groupID, setGroupID] = useState("");
  const [hour, setHour] = useState("");
  const [startYear, setStartYear] = useState(2023);
  const [yearGroupID, setYearGroupID] = useState(0);

  //데이트 피커 전용 변수
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );

  //날짜 포맷팅 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDateExceptDay = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}`;
  };

  //잔디를 그리기 위해 필요한 변수들
  const [grassArray, setGrassArray] = useState([]); //데이터 배열
  const maxValue = Math.max(...grassArray);
  const colorGradient = (value) => {
    const opacity = (value / maxValue) * 0.9 + 0.1;
    return `rgba(0, 120, 50, ${opacity})`;
  };

  //요청 받아서 랜더링을 위해 갈아 끼울 리스트들 // 관련 state 변수들
  //시간단위 조회
  const Series1 = [
    {
      data: new Array(1).fill(0),
      stack: "A",
      label: "공부",
      color: "#003366",
    },
    {
      data: new Array(1).fill(0),
      stack: "A",
      label: "휴식",
      color: "#eaea66",
    },
  ];

  const Circle1 = [
    {
      data: [
        {
          id: 0,
          value: 0,
          label: "공부 시간",
          color: "#003366",
        },
        {
          id: 1,
          value: 1,
          label: "휴식 시간",
          color: "#eaea66",
        },
      ],
    },
  ];
  const [hourSeries, setHourSeries] = useState(Series1);
  const [hourCircle, setHourCircle] = useState(Circle1);

  //일간 조회

  const Series24 = [
    {
      data: new Array(24).fill(0),
      stack: "A",
      label: "공부",
      color: "#003366",
    },
    {
      data: new Array(24).fill(0),
      stack: "A",
      label: "휴식",
      color: "#eaea66",
    },
  ];

  const Circle24 = [
    {
      data: [
        {
          id: 0,
          value: 0,
          label: "공부 시간",
          color: "#003366",
        },
        {
          id: 1,
          value: 1,
          label: "휴식 시간",
          color: "#eaea66",
        },
      ],
    },
  ];
  const [dailySeries, setDailySeries] = useState(Series24);
  const [dailyCircle, setDailyCircle] = useState(Circle24);

  //월간 조회
  const Series31 = [
    {
      data: new Array(32).fill(0),
      stack: "A",
      label: "공부",
      color: "#003366",
    },
    {
      data: new Array(32).fill(0),
      stack: "A",
      label: "휴식",
      color: "#eaea66",
    },
  ];

  const Circle31 = [
    {
      data: [
        {
          id: 0,
          value: 0,
          label: "공부 시간",
          color: "#003366",
        },
        {
          id: 1,
          value: 1,
          label: "휴식 시간",
          color: "#eaea66",
        },
      ],
    },
  ];
  const [monthlySeries, setMonthlySeries] = useState(Series31);
  const [monthlyCircle, setMonthlyCircle] = useState(Circle31);

  ////api 요청 관련
  //시간단위 그래프(한시간동안에 얼마나 공부) api 요청
  const hourCheck = async () => {
    const formattedDate = formatDate(startDate);
    try {
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/log/${user_id}/${groupID}/?date=${formattedDate}&hour=${hour}`) //배포용
      // const res = await axios.get(`http://localhost:8090/log/${user_id}/${groupID}/?date=${formattedDate}&hour=${hour}`) //개발용
      console.log(res.data)
      const modifiedData = 1 - res.data
      Series1[0].data = [res.data];
      Series1[1].data = [modifiedData];
      Circle1[0].data = [
        {
          id: 0,
          value: res.data,
          label: "공부 시간",
          color: "#003366",
        },
        {
          id: 1,
          value: modifiedData,
          label: "휴식 시간",
          color: "#eaea66",
        },
      ];
      setHourSeries(Series1);
      setHourCircle(Circle1);
    } catch (err) {
      console.log(err);
      console.log(user_id, groupID, formattedDate, hour);
    }
  };

  //일간 그래프 api 요청
  const dailyCheck = async () => {
    const formattedDate = formatDate(startDate);
    try {
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/log/${user_id}/${groupID}/?date=${formattedDate}`) //배포용
      // const res = await axios.get(`http://localhost:8090/log/${user_id}/${groupID}/?date=${formattedDate}`)// 개발용
      console.log(res.data)
      const modifiedData = res.data.map(value => 1 - value)
      Series24[0].data = res.data;
      Series24[1].data = modifiedData;
      Circle24[0].data = [
        {
          id: 0,
          value: res.data.reduce((acc, cur) => {
            return acc + cur;
          }, 0),
          label: "공부 시간",
          color: "#003366",
        },
        {
          id: 1,
          value: modifiedData.reduce((acc, cur) => {
            return acc + cur;
          }, 0),
          label: "휴식 시간",
          color: "#eaea66",
        },
      ];
      setDailySeries(Series24);
      setDailyCircle(Circle24);
    } catch (err) {
      console.log(user_id, groupID, formattedDate);
      console.log(err);
    }
  };
  //월간 그래프 api 요청

  const monthCheck = async () => {
    const formattedDate = formatDateExceptDay(startDate);
    try {
      const res = await axios.get(`https://i9c101.p.ssafy.io:8090/log/${user_id}/${groupID}/?month=${formattedDate}`) //배포용
      // const res = await axios.get(`http://localhost:8090/log/${user_id}/${groupID}/?month=${formattedDate}`) //개발용

      console.log(res.data);
      const modifiedData = res.data.map((value) => 1 - value);
      Series31[0].data = res.data;
      Series31[1].data = modifiedData;
      Circle31[0].data = [
        {
          id: 0,
          value: res.data.reduce((acc, cur) => {
            return acc + cur;
          }, 0),
          label: "공부 시간",
          color: "#003366",
        },
        {
          id: 1,
          value: modifiedData.reduce((acc, cur) => {
            return acc + cur;
          }, 0),
          label: "휴식 시간",
          color: "#eaea66",
        },
      ];
      setMonthlySeries(Series31);
      setMonthlyCircle(Circle31);
    } catch (err) {
      console.log(user_id, groupID, formattedDate);
      console.log(err);
    }
  };

  //연간 조회 요청 api (잔디밭)
  const yearCheck = async (targetYear) => {
    try {
      console.log(`GET https://i9c101.p.ssafy.io:8090/log/${user_id}/${yearGroupID}/?year=${targetYear}`);
      const res = await axios.get(
        `https://i9c101.p.ssafy.io:8090/log/${user_id}/${yearGroupID}/?year=${targetYear}`
      ); //배포용
      // const res = await axios.get(`http://localhost:8090/log/${user_id}/${yearGroupID}/?year=${targetYear}`) //개발용
      console.log(res.data);
      setGrassArray(res.data);
    } catch (err) {
      console.log(err);
      console.log(user_id, yearGroupID, targetYear);
    }
  };

  //return (랜더링)

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
              {/* <ToggleButton
                value="day"
                aria-label="day"
                onClick={() => setHandle("day")}
              >
                시간단위 : {Math.round(hourCircle[0].data[0].value * 60)}분 /
                60분
              </ToggleButton> */}
              <ToggleButton
                value="week"
                aria-label="week"
                onClick={() => setHandle("week")}
              >
                일간 : {Math.round(dailyCircle[0].data[0].value)}시간
              </ToggleButton>
              <ToggleButton
                value="month"
                aria-label="month"
                onClick={() => setHandle("month")}
              >
                월간 : {Math.round(monthlyCircle[0].data[0].value * 24)}시간
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* 막대그래프 관련 */}

          <Grid item xs={7}>
            {/* 버튼에 따른 그래프(barChart) */}

            {handle === "day" && (
              <Grid>
                <div className="inputContainer">
                  {/* 그룹 번호 입력 */}
                  <FormControl className="custom-form-control">
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupID}
                      label="Age"
                      onChange={(e) => setGroupID(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>그룹을 선택해주세요.</em>
                      </MenuItem>
                      <MenuItem value={0}>그룹1</MenuItem>
                      <MenuItem value={1}>그룹2</MenuItem>
                      <MenuItem value={2}>그룹3</MenuItem>
                      <MenuItem value={3}>그룹4</MenuItem>
                      <MenuItem value={4}>그룹5</MenuItem>
                    </Select>
                  </FormControl>
                  {/* 날짜 선택하는 데이트 피커 */}
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                    dateFormat="yyyy-MM-dd"
                  />
                  {/* 조회할 시간 입력 */}
                  <FormControl>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={hour}
                      label="Age"
                      onChange={(e) => setHour(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>시간대를 선택해주세요.</em>
                      </MenuItem>
                      <MenuItem value={0}>0시</MenuItem>
                      <MenuItem value={1}>1시</MenuItem>
                      <MenuItem value={2}>2시</MenuItem>
                      <MenuItem value={3}>3시</MenuItem>
                      <MenuItem value={4}>4시</MenuItem>
                      <MenuItem value={5}>5시</MenuItem>
                      <MenuItem value={6}>6시</MenuItem>
                      <MenuItem value={7}>7시</MenuItem>
                      <MenuItem value={8}>8시</MenuItem>
                      <MenuItem value={9}>9시</MenuItem>
                      <MenuItem value={10}>10시</MenuItem>
                      <MenuItem value={11}>11시</MenuItem>
                      <MenuItem value={12}>12시</MenuItem>
                      <MenuItem value={13}>13시</MenuItem>
                      <MenuItem value={14}>14시</MenuItem>
                      <MenuItem value={15}>15시</MenuItem>
                      <MenuItem value={16}>16시</MenuItem>
                      <MenuItem value={17}>17시</MenuItem>
                      <MenuItem value={18}>18시</MenuItem>
                      <MenuItem value={19}>19시</MenuItem>
                      <MenuItem value={20}>20시</MenuItem>
                      <MenuItem value={21}>21시</MenuItem>
                      <MenuItem value={22}>22시</MenuItem>
                      <MenuItem value={23}>23시</MenuItem>
                    </Select>
                  </FormControl>

                  {/* api요청보내는버튼 */}
                  <button onClick={hourCheck} className="apiReqBtn">
                    데이터 불러오기
                  </button>
                </div>

                <BarChart
                  series={hourSeries}
                  width={700}
                  height={250}
                  layout="horizontal"
                />
              </Grid>
            )}

            {handle === "week" && (
              <Grid>
                <div className="inputContainer">
                  {/* 그룹 번호 입력 */}
                  <FormControl>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupID}
                      label="Age"
                      onChange={(e) => setGroupID(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>그룹을 선택해주세요.</em>
                      </MenuItem>
                      <MenuItem value={0}>그룹1</MenuItem>
                      <MenuItem value={1}>그룹2</MenuItem>
                      <MenuItem value={2}>그룹3</MenuItem>
                      <MenuItem value={3}>그룹4</MenuItem>
                      <MenuItem value={4}>그룹5</MenuItem>
                    </Select>
                  </FormControl>
                  {/* 날짜 선택하는 데이트 피커 */}
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                    dateFormat="yyyy-MM-dd"
                  />
                  {/* api요청보내는버튼 */}
                  <button onClick={()=>{
                    dailyCheck();
                    monthCheck();
                  }} 
                  className="apiReqBtn">
                    데이터 불러오기
                  </button>
                </div>
                <BarChart series={dailySeries} width={700} height={250} />
              </Grid>
            )}

            {handle === "month" && (
              <Grid>
                <div className="inputContainer">
                  {/* 그룹 번호 입력 */}
                  <FormControl>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupID}
                      label="Age"
                      onChange={(e) => setGroupID(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>그룹을 선택해주세요.</em>
                      </MenuItem>
                      <MenuItem value={0}>그룹1</MenuItem>
                      <MenuItem value={1}>그룹2</MenuItem>
                      <MenuItem value={2}>그룹3</MenuItem>
                      <MenuItem value={3}>그룹4</MenuItem>
                      <MenuItem value={4}>그룹5</MenuItem>
                    </Select>
                  </FormControl>
                  {/* 월 선택하는 데이트 피커 */}
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                    dateFormat="yyyy-MM-dd"
                  />
                  {/* api요청보내는버튼 */}
                  {/* <button onClick={monthCheck} className="apiReqBtn"> */}
                  <button onClick={()=>{
                    dailyCheck();
                    monthCheck();
                  }} 
                  className="apiReqBtn">
                    데이터 불러오기
                  </button>
                </div>

                <BarChart series={monthlySeries} width={700} height={250} />
              </Grid>
            )}
          </Grid>

          {/* 원그래프 관련 */}

          <Grid item xs={3}>
            {/* 버튼에 따른 그래프(PieChart) */}
            {handle === "day" && (
              <Grid>
                <PieChart series={hourCircle} width={250} height={200} />
              </Grid>
            )}
            {handle === "week" && (
              <Grid>
                <PieChart series={dailyCircle} width={250} height={200} />
              </Grid>
            )}
            {handle === "month" && (
              <Grid>
                <PieChart series={monthlyCircle} width={250} height={200} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* 잔디밭 관련 */}

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
          <FormControl>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={startYear}
              label="Age"
              onChange={(e) => {
                console.log(e.target.value);
                setStartYear(e.target.value);
                yearCheck(e.target.value); // 선택한 연도에 대한 yearCheck 함수 호출
              }}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
            </Select>
          </FormControl>

          {/* grass 격자 그래프  */}
          <Grid item mt="20px">
            <Stack direction={"row"} sx={{ gap: "4px" }}>
              {grassArray
                .reduce((acc, curr, index) => {
                  if (index % 7 === 0) {
                    acc.push([]);
                  }
                  acc[acc.length - 1].push(curr);
                  return acc;
                }, [])
                .map((weekData, weekIdx) => {
                  return (
                    <Stack direction={"column"} sx={{gap: "4px"}}>
                      {weekData.map((dayData, dayIdx)=>{
                        const dayIndex = weekIdx * 7 + dayIdx;
                        const dateNow = new Date(`${startYear}-01-01`);
                        dateNow.setDate(dateNow.getDate() + dayIndex);
                        const currentMonth = dateNow.getMonth() + 1;
                        const day = dateNow.getDate();
                        const color = colorGradient(dayData);
                        const hour = Math.floor(dayData * 24);
                        const minute = Math.floor(
                          60 * (dayData * 24 - Math.floor(dayData * 24))
                        );
                        return (
                          <Tooltip title={`${startYear}년 ${currentMonth}월 ${
                            day ? day : 0
                          }일 , 공부시간: ${hour ? hour : 0}시간 ${
                            minute ? minute : 0
                          }분`}>
                            <Grid
                                key={`${currentMonth}-${day}`}
                                sx={{
                                  width: "13px",
                                  height: "13px",
                                  marginBottom: "1px",
                                  border: "1px solid #1a1b1c",
                                  borderRadius: "1px",
                                  backgroundColor: color,
                                  cursor: "pointer",
                                  position: "relative", // 상대 위치 설정
                                }}
                              ></Grid>
                          </Tooltip>
                        );
                      })}
                    </Stack>
                  );
                })
              }
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
