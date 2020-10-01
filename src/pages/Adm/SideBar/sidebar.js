import React, { useEffect, useState } from "react";
// import ChevronRightIcon from '@material-ui/icons/ChevronRightIcon';
// import MailIcon from '@material-ui/icons';
// import ListItemIcon from '@material-ui/icons/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Drawer } from '@material-ui/core';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import List from "@material-ui/core/List";
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TodayIcon from "@material-ui/icons/Today";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useHistory } from "react-router-dom";

import "./styles.css";

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawer: {
    height: "100%",
    zIndex: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const drawerWidth = 240;

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //     setOpen(true);
  // };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof props.open !== "undefined") {
      setOpen(props.open);
    }
  }, [props]);
  const history = useHistory();
  function navigate (page){
    history.push(`/adm/${page}`)
  }
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <List>
        <ListItem onClick = {()=>navigate("profile")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>

        <ListItem onClick = {()=>navigate("stats")}>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Análises" />
        </ListItem>

        <ListItem onClick = {()=>navigate("profile")}>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Financeiro" />
        </ListItem>

        <ListItem onClick = {()=>navigate("profile")}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Campanhas" />
        </ListItem>

        <ListItem onClick = {()=>navigate("profile")}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </Drawer>
  );
}
