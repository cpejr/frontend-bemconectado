import React from 'react'
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';


export default function SideBar(props){
    

    return (
        <Drawer open={props.drawer} onClose={props.handleDrawerClose} >
            <List>
                    <ListItem button onClick={() => {
                            props.handlePageChange(0);
                            props.handleDrawerClose();
                        }}>
                        <ListItemIcon> <AccessibilityNewIcon/> </ListItemIcon>
                        <ListItemText>AJUDE AGORA</ListItemText>
                    </ListItem>
                

                <Divider/>

                <ListItem button onClick={() => {
                        props.handlePageChange(1);
                        props.handleDrawerClose();
                    }}>
                    <ListItemIcon> <HelpOutlineIcon/> </ListItemIcon>
                    <ListItemText>O QUE É</ListItemText>
                </ListItem>

                <Divider/>

                <ListItem button onClick={() => {
                        props.handlePageChange(2);
                        props.handleDrawerClose();
                    }}>
                    <ListItemIcon> <EmojiObjectsIcon/> </ListItemIcon>
                    <ListItemText>QUEM SOMOS</ListItemText>
                </ListItem>

                <Divider/>

                <ListItem button onClick={() => {
                        props.handlePageChange(3);
                        props.handleDrawerClose();
                    }}>
                    <ListItemIcon> <MailOutlineIcon/> </ListItemIcon>
                    <ListItemText>CONTATO</ListItemText>
                </ListItem>

                <Divider/>

                <ListItem button onClick={() => {
                        props.handlePageChange(4);
                        props.handleDrawerClose();
                    }}>
                    <ListItemIcon> <QuestionAnswerIcon/> </ListItemIcon>
                    <ListItemText>FAQ</ListItemText>
                </ListItem>
                

            </List>
        </Drawer>
    )
}