import React, { useState } from 'react'
import Header from "./Header"
import SideBar from "./SideBar"

export default function Admin(props) {

    const [open, setOpen] = useState(false);

    return (
        <div className="h-100">
            <Header onClick={() => setOpen(!open)} />
            <SideBar open={open} />
            {props.children}
        </div>
    )
}