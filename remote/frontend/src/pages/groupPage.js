import React from "react";
import { Box, Grid, Button, Stack } from "@mui/material";

import BasicTimer from "../components/basicTimer";
import { useState } from "react";

export default function GroupPage({useId, groupId}) {

  const [time, setTime] = useState(0);

  const timerList = async ()=> {
    try {
      

    } catch (err) {

    }
  }

  return (
    <Box className="group">
      <Grid container>
        <Grid item xs={9}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BasicTimer time={time} setTime={setTime} />
          <Button
            variant="contained"
            sx={{ bgcolor:"#003366", border: "4px solid #003366", borderRadius:"10px", width: "50dvw", height:"6dvh" }}
            // 타이머 생성 기능 추가 요망
            onClick={()=>alert("new timer")}
          >
            +
          </Button>
        </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack position="fixed" bottom="60px" right="60px">
            <Button
              variant="contained"
              color="success"
              sx={{ width: "12dvw", height: "6dvh", m: "10px", p:"5px", fontSize:"20px"}}
            >
              {/* 서버로 현재 설정 save() 하는 기능 추가 */}
              저 장
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ width: "12dvw", height: "6dvh", m: "10px", p:"5px", fontSize:"20px" }}
            >
              {/* 서버에 저장된 내용 load() 하는 추가 */}
              되돌리기
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
