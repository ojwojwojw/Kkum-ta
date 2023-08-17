import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

import { Grid } from "@mui/material";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

export default function MenuListBar() {
  const [open, setOpen] = React.useState(false);
  const isDeviceLinked = useSelector((state) => state.auth.isDeviceLinked);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid item className="side-bar" zIndex={999}>
      {isDeviceLinked && (
        <List
          sx={{
            top: "80px",
            left: 0,
            position: "fixed",
            width: "280px",
            minHeight: "100dvh",
            bgcolor: "background.paper",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton component={Link} to="/reports">
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="통계" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="그룹관리" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to={`group/${1}`}
                sx={{
                  pl: 4,
                  bgcolor: "#fafafa",
                  borderBottom: "2px solid #cacaca",
                }}
              >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="GROUP 1" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to={`group/${2}`}
                sx={{
                  pl: 4,
                  bgcolor: "#fafafa",
                  borderBottom: "2px solid #cacaca",
                }}
              >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="GROUP 2" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to={`group/${3}`}
                sx={{
                  pl: 4,
                  bgcolor: "#fafafa",
                  borderBottom: "2px solid #cacaca",
                }}
              >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="GROUP 3" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to={`group/${4}`}
                sx={{
                  pl: 4,
                  bgcolor: "#fafafa",
                  borderBottom: "2px solid #cacaca",
                }}
              >
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="GROUP 4" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      )}
    </Grid>
  );
}
