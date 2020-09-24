import { Box } from '@material-ui/core';
import React, { useState } from 'react'
import Header from "./Header"
import SideBar from "./SideBar"

export default function Admin(props) {

    const [open, setOpen] = useState(false);

    return (
        <div className="h-100">
            <Header onClick={() => setOpen(!open)} />
            <Box zIndex="bottom" style={{ paddingTop: "15vh" }} className="h-100 d-flex">
                <SideBar open={open} />
                <div className="d-flex flex-column h-100 flex-grow-1 mh-100">
                    {props.children}
                </div>
            </Box>
        </div>
    )
}