import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Numpad from "./numpad";
import { Grid } from "@mui/material";

// swiper
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

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

export default function TransitionsModal(type) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState(0);

  // 시간설정을 위한 변수 작성
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  return (
    <div>
      {type === "create" && <Button onClick={handleOpen}>Create watch</Button>}
      <Button onClick={handleOpen}>Create watch</Button>
      {type === "create" ? (
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
              <Grid container>
                <Grid item xs={12}>
                  <input
                    type="number"
                    min={0}
                    max={99}
                    onChange={(hour) =>
                      setHour(hour.target.value < 0 ? 0 : hour.target.value)
                    }
                  ></input>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    onChange={(min) =>
                      setMin(min.target.value < 0 ? 0 : min.target.value)
                    }
                  ></input>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    onChange={(sec) =>
                      setSec(sec.target.value < 0 ? 0 : sec.target.value)
                    }
                  ></input>

                  {/* <Numpad
                  input={hour * 3600 + min * 60 + Number(sec)}
                  setInput={setInput}
                /> */}
                </Grid>
                <Grid item xs={3}>
                  <Button>Create Timer</Button>
                  <div className="swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">1</div>
                      <div className="swiper-slide">2</div>
                      <div className="swiper-slide">3</div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      ) : (
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
              <Grid container>
                <Grid item xs={12}>
                  <input
                    type="number"
                    min={0}
                    max={99}
                    onChange={(hour) =>
                      setHour(hour.target.value < 0 ? 0 : hour.target.value)
                    }
                  ></input>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    onChange={(min) =>
                      setMin(min.target.value < 0 ? 0 : min.target.value)
                    }
                  ></input>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    onChange={(sec) =>
                      setSec(sec.target.value < 0 ? 0 : sec.target.value)
                    }
                  ></input>

                  {/* <Numpad
                  input={hour * 3600 + min * 60 + Number(sec)}
                  setInput={setInput}
                /> */}
                </Grid>
                <Grid item xs={3}>
                  <Button>Create Timer</Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
