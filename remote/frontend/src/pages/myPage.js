import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import axios from "axios";
import { linkDevice } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Input } from "@mui/material";

const MyPage = () => {
    const user_id = useSelector(state => state.auth.userName)
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const newData = localStorage.getItem("accessToken") 
    const [tokenData, setTokenData] = useState(newData)
    const navigate = useNavigate()
    // const isDeviceLinked = useEffect(state => state.auth.IsDeviceLinked)

    //자동으로 디바이스 등록여부 확인하는 함수 실행
    useEffect(()=>{
        IsDeviceLinked();
    },[])


    //디바이스와 웹 연동
    const linkToDevice= async () => {
        const data = {
          "device_serial" : input
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData}` // 액세스 토큰을 Authorization 헤더에 설정하는 방법
            },
        }

        try {
          const res = await axios.patch(`https://i9c101.p.ssafy.io:8090/dev/user/${user_id}` ,data ,config) //배포용
        //   const res = await axios.patch(`http://localhost:8090/dev/user/${user_id}` ,data ,config) //개발용
          console.log(res.data)
          dispatch(linkDevice(true))  //redux에 반영
          navigate('/reports')
        }
        catch (err) {
          console.log(err)

        }
      }

    //백엔드로부터 연동 여부 확인받기 (디바이스 키 조회)
    const IsDeviceLinked= async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenData}` // 액세스 토큰을 Authorization 헤더에 설정하는 방법
            },
        }
        try {
          const res = await axios.get(`https://i9c101.p.ssafy.io:8090/dev/user/${user_id}` ,config) //배포용
        //   const res = await axios.get(`http://localhost:8090/dev/user/${user_id}`,config) //개발용
          console.log(res.data)
          dispatch(linkDevice(true))  //redux에 반영
          
          

        }
        catch (err) {
          console.log(err)
          dispatch(linkDevice(false))  //redux에 반영
          console.log(tokenData)
        }
      }

  return(
    <Grid
      container
      sx={{
        marginTop: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "40vh",
        paddingRight: "20%", // 디바이스키 입력창 가운데 정렬
      }}
    >
        <Grid xs={12}>
          <h1>{user_id}의 페이지</h1>
        </Grid>
        <Grid xs={12}>
          <Input 
              type="text"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder="디바이스 키를 입력해주세요."
              sx={{
                marginRight :'10px',
                minWidth: "300px",
                p: "20px",
                fontSize: "20px",
                bgcolor: "#fff",
                borderRadius: "15px",
              }}
              disableUnderline={"true"}
          />
          <Button
              sx={{ p: "20px", 
                    marginRight :'10px',
                    fontSize: "20px", 
                    fontWeight: 600, 
                    color: "white" ,
                    bgcolor: "#003366",
                    borderRadius: "10px",
                  }} 
                    onClick={linkToDevice}
          >
              등록하기
          </Button>
          <Button
            sx={{ p: "20px", 
                  fontSize: "20px", 
                  fontWeight: 600, 
                  color: "white" ,
                  bgcolor: "#003366",
                  borderRadius: "10px",
                }}  
            onClick={IsDeviceLinked} 
          >
              디바이스 등록여부 확인
          </Button>
        </Grid>
        
        
    </Grid>
  )
};

export default MyPage;
