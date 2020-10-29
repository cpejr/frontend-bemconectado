import { Box } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { Redirect } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Admin(props) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(LoginContext);

  return (
    <div className="h-100">
      <Header onClick={() => setOpen(!open)} />
      <Box
        zIndex="bottom"
        style={{ paddingTop: "15vh", overflowX: "hidden" }}
        className="h-100 d-flex"
      >
        <SideBar open={open} />
        <div
          className="d-flex flex-column h-100 flex-grow-1 mh-100"
          style={{ marginLeft: "73px" }}
        >
          {props.children}
        </div>
      </Box>
      {user.type !== "admin" && <Redirect to="/" />}
    </div>
  );
}
