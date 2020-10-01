import React, { useEffect, useState } from 'react';
// import ChevronRightIcon from '@material-ui/icons/ChevronRightIcon';
// import MailIcon from '@material-ui/icons';
// import ListItemIcon from '@material-ui/icons/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Drawer } from '@material-ui/core';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import './styles.css';

const useStyles = makeStyles((theme) => ({
        
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            position: 'fixed',
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
            [theme.breakpoints.down(700)]: {
                display: 'none',
            },
            position: 'fixed',
        },
        drawer: {
            height: "100%",
            zIndex: 0
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        }
}));

const drawerWidth = 240;

export default function Header(props){

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };
    
    const handleDrawerClose = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        if(typeof props.open !== "undefined"){
            setOpen(props.open)
        }

    }, [props]);

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
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>

    )
}