import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

import './styles.css';

export default function Header(props){
    return (
        <div className = "HeaderName" >
            <div className="menuButton">
                <IconButton onClick={() =>  props?.onClick()}>
                    <MenuIcon style={{ color: "#fff", fontSize: '50px' }}/>
                </IconButton>
            </div>

            <img src = "/logos/4-semFundo.png" alt = "Logo Bem Conectado"/> 
        </div>
    )
}