import React from "react";
import "./App.css";
import { Grid, Box } from "@mui/material";

import BasicContainer from "./components/basicTimer/basicContainer";
function App() {
  return (
    <div className="App">
      <Box>
        <Grid>
          <BasicContainer />
        </Grid>
      </Box>
    </div>
  );
}

export default App;
