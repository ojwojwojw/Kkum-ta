import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

export default function BasicTimer() {
  const [time, setTime] = useState(60000);

	const [hour, setHour] = useState(0);
	const [min, setMin] = useState(0);
	const [sec, setSec] = useState(0);

	useEffect(()=> {
		const interval = setInterval(()=> {
			const hours = Math.floor(time/3600000)>0?Math.floor(time/3600000):0;
			const minutes = Math.floor((time%3600000)/60000)>0?Math.floor((time%3600000)/60000):0;
			const seconds = Math.floor((time%60000)/1000)>0?Math.floor((time%60000)/1000):0;

			setHour(hours);
			setMin(minutes);
			setSec(seconds);

			setTime(prevTime => prevTime - 1000);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [time]);

  return (
    <Box>
      <Grid
        container
        border={"6px solid #333"}
        sx={{
          width: "50dvw",
          height: "18dvh",
          m: "10px",
          borderRadius: "10px",
					fontSize:"11dvh"
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          {String(hour).padStart(2,'0')} : {String(min).padStart(2,'0')} : {String(sec).padStart(2,'0')}
        </Grid>
      </Grid>
    </Box>
  );
}
