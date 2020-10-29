import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TodayIcon from "@material-ui/icons/Today";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
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
    position: "fixed",
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
    [theme.breakpoints.down(700)]: {
      display: "none",
    },
    position: "fixed",
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
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile");

  useEffect(() => {
    if (typeof props.open !== "undefined") {
      setOpen(props.open);
    }
  }, [props]);
  const history = useHistory();
  function navigate(page) {
    setCurrentPage(page);
    history.push(`/adm/${page}`);
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
      style={{ zIndex: 100 }}
    >
      <List style={{ backgroundColor: "white" }}>
        <ListItem
          selected={currentPage === "profile"}
          onClick={() => navigate("profile")}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>

        <ListItem
          selected={currentPage === "stats"}
          onClick={() => navigate("stats")}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Análises" />
        </ListItem>

        <ListItem
          selected={currentPage === "finance"}
          onClick={() => navigate("finance")}
        >
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Financeiro" />
        </ListItem>

        <ListItem
          selected={currentPage === "campaign"}
          onClick={() => navigate("campaign")}
        >
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Campanhas" />
        </ListItem>

        <ListItem onClick={() => navigate("profile")}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </Drawer>
  );
}
