import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton } from '@material-ui/core';

import './styles.css';

export default function Header(props) {
    return (
        <AppBar position="fixed" className="HeaderName" >
            <div className="menuButton">
                <IconButton onClick={() => props?.onClick()}>
                    <MenuIcon style={{ color: "#fff", fontSize: '50px' }} />
                </IconButton>
            </div>

            <img src="/logos/4-semFundo.png" alt="Logo Bem Conectado" />
        </AppBar>
    )
}