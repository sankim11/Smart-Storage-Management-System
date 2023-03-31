import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      backgroundColor: "#EAD1A8", 
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function SideDrawerC({ open, closeDrawer }) {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
      <Link to={"/homepage"} style={{ color: 'inherit', textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardCustomizeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to={"/cart"} style={{ color: 'inherit', textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="My Cart" />
    </ListItemButton>
    </Link>
    <Link to={"/myorder"} style={{ color: 'inherit', textDecoration: 'none' }}>
    <ListItemButton>
      <ListItemIcon>
        <LocalMallIcon />
      </ListItemIcon>
      <ListItemText primary="My Orders" />
    </ListItemButton>
    </Link>
      </List>
    </Drawer>
  )
}

export default SideDrawerC;