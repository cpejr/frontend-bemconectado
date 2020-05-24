import React from 'react'
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { HashLink } from 'react-router-hash-link';


export default function SideBar(props){
    

    return (
        <Drawer open={props.drawer} onClose={props.handleDrawerClose} >
            <List>
                <HashLink smooth to="#main" style={{'text-decoration': 'none', color: 'black'}}>
                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> <AccessibilityNewIcon/> </ListItemIcon>
                        <ListItemText>AJUDE AGORA</ListItemText>
                    </ListItem>
                </HashLink>

                <Divider/>

                <HashLink smooth to="#saibaMais" style={{'text-decoration': 'none', color: 'black'}}>
                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> <HelpOutlineIcon/> </ListItemIcon>
                        <ListItemText>O QUE É</ListItemText>
                    </ListItem>
                </HashLink>

                <Divider/>

                <HashLink smooth to="#sobreNos" style={{'text-decoration': 'none', color: 'black'}}>
                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> <EmojiObjectsIcon/> </ListItemIcon>
                        <ListItemText>QUEM SOMOS</ListItemText>
                    </ListItem>
                </HashLink>

                <Divider/>

                <HashLink smooth to="#contato" style={{'text-decoration': 'none', color: 'black'}}>
                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> <MailOutlineIcon/> </ListItemIcon>
                        <ListItemText>CONTATO</ListItemText>
                    </ListItem>
                </HashLink>

                <Divider/>

                <HashLink smooth to="#contato" style={{'text-decoration': 'none', color: 'black'}}>
                    <ListItem button onClick={props.handleDrawerClose}>
                        <ListItemIcon> <QuestionAnswerIcon/> </ListItemIcon>
                        <ListItemText>FAQ</ListItemText>
                    </ListItem>
                </HashLink>

            </List>
        </Drawer>
    )
}