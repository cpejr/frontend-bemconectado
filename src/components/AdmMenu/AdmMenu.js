import { Box } from "@material-ui/core";
import React, { useState } from "react";
import Header from "../../components/AdmMenu/Header";
import SideBar from "../../components/AdmMenu/SideBar";
import "./styles.css";

export default function AdmMenu(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-100">
      <Header onClick={() => setOpen(!open)} />
      <Box
        zIndex="bottom"
        style={{ paddingTop: "15vh", overflowX: "hidden" }}
        className="h-100 d-flex"
      >
        <SideBar open={open} />
        <div className="d-flex flex-column h-100 flex-grow-1 mh-100 menuContent">
          {props.children}
        </div>
      </Box>
    </div>
  );
}
