import React, { useEffect, useState } from "react";

import { Grid, Box, Modal, Fade, Button, Backdrop } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

export default function UpdateModal({ input, setInput, updateTimer }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <div>
      <Button
        sx={{
          width: "60px",
          height: "60px",
          ml: "30px",
          mb: 2,
          borderRadius: 4,
          bgcolor: "#376f94",
          color: "white",
          fontSize: "30px",
          pb: 0,
        }}
        onClick={handleOpen}
      >
        SET
      </Button>
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
                  setInput((hour * 3600 + min * 60 + sec) * 1000);
                  console.log(input);
                  updateTimer(input);
                  setHour(0);
                  setMin(0);
                  setSec(0);
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
