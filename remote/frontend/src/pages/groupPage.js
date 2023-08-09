import React from "react";
import { Box, Grid, Button, Stack } from "@mui/material";

import BasicTimer from "../components/basicTimer";

export default function GroupPage() {
  return (
    <Box className="group">
      <Grid container>
        <Grid xs={9}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BasicTimer />
          <Button
            variant="contained"
            sx={{ bgcolor:"#003366", border: "4px solid #003366", borderRadius:"10px", width: "50dvw", height:"6dvh" }}
          >
            +
          </Button>
        </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack justifyContent={"flex-end"} alignItems={"center"}>

            <Button
              variant="contained"
              color="success"
              sx={{ width: "12dvw", height: "6dvh", m: "6px" }}
            >
              Button
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "12dvw", height: "6dvh", m: "6px" }}
            >
              Button
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
