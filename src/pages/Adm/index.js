import React, { useState } from 'react'
import Header from "./Header"
import SideBar from "./SideBar"
import Profile from "./Profile"

export default function Admin(props){

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Header onClick={()=> setOpen(!open)} />
            <div>
                <SideBar open={open}/>
                <div>
                    {props.children}
                    <Profile/>
                </div>
            </div>
        </div>
    )
}