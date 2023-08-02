import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./CustomTabPanel.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Grid
        container
        className="header"
        height={"60px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={1}>
          LOGO
        </Grid>
        <Grid item xs={10}></Grid>
        <Grid item xs={1}>
          USER
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          sx={{
            width: "14%",
            borderColor: "divider",
            borderRight: 1,
            height: 2000,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            aria-label="menu Tabs"
          >
            <Tab label="통 계" {...a11yProps(0)} />
            <Tab label="그룹관리" {...a11yProps(1)} />
            <Tab label="Menu 3" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid>
          <CustomTabPanel value={value} index={0}>
            Menu one
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Menu Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Menu Three
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}
