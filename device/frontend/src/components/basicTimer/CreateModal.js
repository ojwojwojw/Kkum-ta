import React, { useEffect, useState } from "react";

import { Grid,Box,Modal,Fade,Button,Backdrop } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "150px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ input, setInput, createTimer }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    setInput(hour * 3600 + min * 60 + sec);
  });

  let arr100 = Array.from({ length: 100 }, (v, i) =>
    String(i).padStart(2, "0")
  );
  let arr60 = Array.from({ length: 60 }, (v, i) => String(i).padStart(2, "0"));

  return (
    <div>
      <Button onClick={handleOpen}>Create watch</Button>
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
          <Box sx={style}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
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
                  {arr100.map((hour) => (
                    <SwiperSlide>{hour}</SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
              <Grid item xs={1} textAlign={"center"} fontSize={"35px"}>
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
                  {arr60.map((min) => (
                    <SwiperSlide>{min}</SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
              <Grid item xs={1} textAlign={"center"} fontSize={"35px"}>
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
                  {arr60.map((sec) => (
                    <SwiperSlide>{sec}</SwiperSlide>
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
                onClick={() => {
                  var maxIter=1
                  setInput(hour * 3600 + min * 60 + sec);
                  createTimer(input*1000, maxIter)
                  console.log(input);
                  setHour(0);
                  setMin(0);
                  setSec(0);
                  handleClose();
                }}
              >
                Create Timer
              </Button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
