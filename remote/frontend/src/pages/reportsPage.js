import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import {FormControl , InputLabel , Select , MenuItem} from "@mui/material";
import './reportPage.css'

import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { BarChart, PieChart } from "@mui/x-charts";
import axios from 'axios'

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

  //api 요청시 필요한 데이터 
  const user_id = useSelector(state => state.auth.userName);
  const [groupID, setGroupID] = useState("");
  const [hour , setHour] = useState("");

  //데이트 피커 전용 변수
  const [startDateForHour, setStartDateForHour] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [startMonth, setStartMonth] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );


  //요청 받아서 랜더링을 위해 갈아 끼울 리스트들 // 관련 state 변수들
  //시간단위 조회
  const Series1=[
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
    
  ]

  const Circle1=[
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
  ]
  const [hourSeries, setHourSeries] = useState(Series1)
  const [hourCircle,setHourCircle] = useState(Circle1)


  //일간 조회

  const Series24=[
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
  ]

  const Circle24=[
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
  ]
  const [dailySeries, setDailySeries] = useState(Series24)
  const [dailyCircle, setDailyCircle] = useState(Circle24)
  

  //월간 조회
  const Series31=[
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
  ]

  const Circle31=[
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
  ]
  const [monthlySeries, setMonthlySeries] = useState(Series31)
  const [monthlyCircle, setMonthlyCircle] = useState(Circle31)
  


  ////api 요청 관련
  //시간단위 그래프(한시간동안에 얼마나 공부) api 요청
  const hourCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:8090/log/${user_id}/${groupID}/?date=${startDateForHour}&hour=${hour}`)

      const modifiedData = 1 - res.data
      Series1[0].data = [res.data];
      Series1[1].data = [modifiedData];
      Circle1[0].data = [{
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
      }]
      setHourSeries(Series1)
      setHourCircle(Circle1)
    }
    catch (err) {
      console.log(err)
    }
  }

  //일간 그래프 api 요청
  const dailyCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:8090/log/${user_id}/${groupID}/?date=${startDate}`)

      const modifiedData = res.data.map(value => 1 - value)
      Series24[0].data = res.data;
      Series24[1].data = modifiedData;
      Circle24[0].data = [{
        id: 0,
        value: res.data.reduce((acc,cur)=>{return acc + cur},0),
        label: "공부 시간",
        color: "#003366",
      },
      {
        id: 1,
        value: modifiedData.reduce((acc,cur)=>{return acc + cur},0),
        label: "휴식 시간",
        color: "#eaea66",
      }]
      setDailySeries(Series24)
      setDailyCircle(Circle24)

    }
    catch (err) {
      console.log(err)
    }
  }
  //월간 그래프 api 요청

  const monthCheck = async () => {
    try {
      const temp = startMonth.getFullYear() + '-' + (startMonth.getMonth() + 1);
      const res = await axios.get(`http://localhost:8090/log/${user_id}/${groupID}/?month=${temp}`)
      
      console.log(res.data)
      const modifiedData = res.data.map(value => 1 - value)
      Series31[0].data = res.data;
      Series31[1].data = modifiedData;
      Circle31[0].data = [{
        id: 0,
        value: res.data.reduce((acc,cur)=>{return acc + cur},0),
        label: "공부 시간",
        color: "#003366",
      },
      {
        id: 1,
        value: modifiedData.reduce((acc,cur)=>{return acc + cur},0),
        label: "휴식 시간",
        color: "#eaea66",
      }]
      setMonthlySeries(Series31)
      setMonthlyCircle(Circle31)

    }
    catch (err) {
      console.log(err)
      
    }
  }
  

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

          <Grid item xs={2} >
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
                시간단위 : {Math.round(hourCircle[0].data[0].value*60)}분 / 60분
              </ToggleButton>
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
                월간 : {Math.round(monthlyCircle[0].data[0].value*24)}시간
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* 막대그래프 관련 */}

          <Grid item xs={7}>
            {/* 버튼에 따른 그래프(barChart) */}
            
            {handle === "day" && (
              <Grid>
                {/* 그룹 번호 입력 */}
                <FormControl className="custom-form-control">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={groupID}
                    label="Age"
                    onChange={(e)=> setGroupID(e.target.value)}
                  >
                    <MenuItem value={0}>그룹1</MenuItem>
                    <MenuItem value={1}>그룹2</MenuItem>
                    <MenuItem value={2}>그룹3</MenuItem>
                    <MenuItem value={3}>그룹4</MenuItem>
                    <MenuItem value={4}>그룹5</MenuItem>
                  </Select>
                </FormControl>
                {/* 날짜 선택하는 데이트 피커 */}
                <DatePicker
                  selected={startDateForHour}
                  onChange={date => setStartDateForHour(date)}
                  customInput={<ExampleCustomInput />}
                />
                {/* 조회할 시간 입력 */}
                <FormControl>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hour}
                    label="Age"
                    onChange={(e)=> setHour(e.target.value)}
                  >
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
                <button onClick={hourCheck}>데이터 불러오기</button>


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
                {/* 그룹 번호 입력 */}
                <FormControl>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={groupID}
                    label="Age"
                    onChange={(e)=> setGroupID(e.target.value)}
                  >
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
                  onChange={date => setStartDate(date)}
                  customInput={<ExampleCustomInput />}
                />
                {/* api요청보내는버튼 */}
                <button onClick={dailyCheck}>데이터 불러오기</button>

                <BarChart
                  series={dailySeries}
                  width={700}
                  height={250}
                />
              </Grid>
            )}

            {handle === "month" && (
              <Grid>
                 {/* 그룹 번호 입력 */}
                 <FormControl>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={groupID}
                    label="Age"
                    onChange={(e)=> setGroupID(e.target.value)}
                  >
                    <MenuItem value={0}>그룹1</MenuItem>
                    <MenuItem value={1}>그룹2</MenuItem>
                    <MenuItem value={2}>그룹3</MenuItem>
                    <MenuItem value={3}>그룹4</MenuItem>
                    <MenuItem value={4}>그룹5</MenuItem>
                  </Select>

                </FormControl>
                {/* 월 선택하는 데이트 피커 */}
                <DatePicker
                  selected={startMonth}
                  onChange={date => setStartMonth(date)}
                  customInput={<ExampleCustomInput />}
                />
                {/* api요청보내는버튼 */}
                <button onClick={monthCheck}>데이터 불러오기</button>


                <BarChart
                  series={monthlySeries}
                  width={700}
                  height={250}
                />
              </Grid>
            )}
          </Grid>

          {/* 원그래프 관련 */}

          <Grid item xs={3}>
            {/* 버튼에 따른 그래프(PieChart) */}
            {handle === "day" && (
              <Grid>
                <PieChart
                  series={hourCircle}
                  width={250}
                  height={200}
                />
              </Grid>
            )}
            {handle === "week" && (
              <Grid>
                <PieChart
                  series={dailyCircle}
                  width={250}
                  height={200}
                />
              </Grid>
            )}
            {handle === "month" && (
              <Grid>
                <PieChart
                  series={monthlyCircle}
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
          
          {/* 잔디밭 관련 */}

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
