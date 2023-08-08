import React, { useState } from "react";
import "./App.css";
import MenuListBar from "./components/MenuListBar";
// import Login from "./components/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Box, Grid, Button, Menu, MenuItem } from "@mui/material";
import ReportPage from "./pages/reportsPage";
import GroupPage from "./pages/groupPage";
import SignupPage from "./pages/signupPage";
import Login from "./components/login";
import { useSelector} from "react-redux/es/hooks/useSelector";









function App() {
  

  // const isAthenticated = useSelector(state => state.auth.isAthenticated)
  const [isAthenticated, setIsAthenticated] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <BrowserRouter>
      <div className="App">
        {isAthenticated && (
          <Box>
            <Grid
              container
              position={"fixed"}
              className="navbar"
              justifyContent={"center"}
              alignItems={"center"}
              height={"50px"}
              zIndex={100}
            >
              <Grid item xs={1}>
                <Link to="/">LOGO</Link>
              </Grid>
              <Grid item xs={10}></Grid>
              <Grid item xs={1}>
                {!isAthenticated ? (
                  <>
                    <Button
                      id="user-button"
                      aria-controls={open ? "user-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      UserName
                    </Button>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "user-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>MyPage</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              position={"absolute"}
              top={"53px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <MenuListBar />
              <Grid item xs={10}>
                <Routes>
                  <Route exact path="/" Component={""} />
                  <Route exact path="/login" Component={Login} />
                  <Route exact path="/reports" Component={ReportPage} />
                  <Route exact path="/group1" Component={GroupPage} />
                  <Route exact path="/group2" Component={GroupPage} />
                  <Route exact path="/group3" Component={GroupPage} />
                  <Route exact path="/group4" Component={GroupPage} />
                  <Route exact path="/group5" Component={GroupPage} />
                  <Route exact path="report" Component={ReportPage} />
                  <Route exact path="signup" Component={SignupPage} />
                </Routes>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
