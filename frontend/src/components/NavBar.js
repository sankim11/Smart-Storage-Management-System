import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HiveIcon from "@mui/icons-material/Hive";

const drawerWidth = 240;

// Styling the app bar and transition effect for drawer
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function NavBar({ open, openDrawer }) {
  return (
    // Navigation bar at the top
    <AppBar position="absolute" open={open} sx={{ backgroundColor: "#E0BB7F" }}>
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton
          edge="start"
          color="black"
          aria-label="open drawer"
          onClick={openDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="black"
          fontFamily={"Roboto"}
          fontSize={"1.5em"}
          noWrap
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          <Link
            to={"/dashboard"}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            L'Alveare <HiveIcon />
          </Link>
        </Typography>
        <Button
          variant="contained"
          color="error"
          href="/"
          sx={{ fontStyle: "oblique", mr: 1 }}
        >
          <LogoutIcon style={{ color: "white" }}></LogoutIcon>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
