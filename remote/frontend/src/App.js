import React, { useState } from "react";
import "./App.css";
import MenuListBar from "./components/MenuListBar";
import Login from "./components/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Grid, Button, Menu, MenuItem } from "@mui/material";

function App() {
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
          <Grid
            container
            className="navbar"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={2}>
              <Link to="/">LOGO</Link>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
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
        )}
        <Routes>
          <Route
            exact
            path="/"
            Component={!isAthenticated ? Login : MenuListBar}
          ></Route>
          <Route exact path="login" Component={Login} />
          <Route exact path="reports" Component={""} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
