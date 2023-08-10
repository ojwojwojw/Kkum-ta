import React, { useEffect, useState } from "react";

import {
  Grid,
  Box,
  Modal,
  Fade,
  Button,
  Backdrop,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useDispatch } from "react-redux";
import {
  setTimeToInsert,
  changeInitTimeForInsert,
  forceRendering,
} from "../../redux/timerSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40dvw",
  height: "36dvh",
  bgcolor: "background.paper",
  border: "1px solid #003366",
  borderRadius: "20px",
  boxShadow: 24,
  p: "5dvh",
};

export default function UpdateModal({ WatchId, updateTimer }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState(0);

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    setInput((hour * 3600 + min * 60 + sec) * 1000);
  });

  let arr100 = Array.from({ length: 100 }, (v, i) =>
    String(i).padStart(2, "0")
  );
  let arr60 = Array.from({ length: 60 }, (v, i) => String(i).padStart(2, "0"));

  // //타이머 시간 설정
  // function resetInitTime() {
  //   timer.reset();
  // }

  function insertTime(int) {
    console.log("시발 왜 안찍혀", int);
    console.log(WatchId);
    dispatch(setTimeToInsert(int));
    dispatch(changeInitTimeForInsert({ id: WatchId, value: int }));
    updateTimer(int);
  }

  return (
    <div>
      <IconButton
        sx={{
          borderRadius: 4,
          color: "gray",
          pb: 0,
        }}
        onClick={handleOpen}
      >
        <SettingsIcon sx={{ fontSize: "7dvh" }} />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modal-box">
            <Grid
              container
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Grid item xs={2}>
                <Swiper
                  direction={"vertical"}
                  spaceBetween={4}
                  slidesPerView={1}
                  loop={true}
                  onActiveIndexChange={(obj) => {
                    setHour(obj.realIndex);
                  }}
                >
                  {arr100.map((hour, idx) => (
                    <SwiperSlide key={idx}>{hour}</SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
              <Grid item xs={1} textAlign={"center"} fontSize={"10dvh"}>
                :
              </Grid>
              <Grid item xs={2}>
                <Swiper
                  direction={"vertical"}
                  spaceBetween={4}
                  slidesPerView={1}
                  loop={true}
                  onActiveIndexChange={(obj) => {
                    setMin(obj.realIndex);
                  }}
                >
                  {arr60.map((min, idx) => (
                    <SwiperSlide key={idx}>{min}</SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
              <Grid item xs={1} textAlign={"center"} fontSize={"10dvh"}>
                :
              </Grid>
              <Grid item xs={2}>
                <Swiper
                  direction={"vertical"}
                  spaceBetween={4}
                  slidesPerView={1}
                  loop={true}
                  onActiveIndexChange={(obj) => {
                    setSec(obj.realIndex);
                  }}
                >
                  {arr60.map((sec, idx) => (
                    <SwiperSlide key={idx}>{sec}</SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            </Grid>
            <Grid
              container
              height={"100px"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
            >
              <Button
                sx={{
                  fontSize: "3.5dvh",
                  top: "10dvh",
                  right: "1dvw",
                  p: "dvh",
                  pr: "4dvh",
                  pl: "4dvh",
                }}
                variant="contained"
                color="success"
                onClick={() => {
                  // setInput((hour * 3600 + min * 60 + sec) * 1000);
                  insertTime(input);
                  // updateTimer(input);
                  // setHour(0);
                  // setMin(0);
                  // setSec(0);
                  // resetInitTime();
                  handleClose();
                }}
              >
                Update Timer
              </Button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}