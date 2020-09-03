import React from 'react'
import Header from "./Header"
//import SideBar from "./SideBar"

export default function Admin(props){
    return (
        <div>
            <Header/>
            <div>
                {/* <SideBar/> */}
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}