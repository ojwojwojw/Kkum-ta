import React from "react";
import "./App.css";
<<<<<<< HEAD
import { Grid, Box } from "@mui/material";
=======
import { BrowserRouter, Routes, Route, Link, RouterProvider } from 'react-router-dom';

import GroupComponent from "./components/basicTimer/groupComponent";
>>>>>>> develop

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Box>
        <Grid>
          <BasicContainer />
        </Grid>
      </Box>
=======
      <GroupComponent />
>>>>>>> develop
    </div>
  );
}

export default App;
