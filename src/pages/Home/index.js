import React, { useState } from 'react';
import './styles.css';

import {IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Main from './Main';
import QuemSomos from './QuemSomos';
import BemConectado from './BemConectado';
import SideBar from './SideBar';
import Contato from './Contato';
import FAQ from './FAQ';
import BacktoTop from '../../components/BacktoTopButton'

export default function Home() {
  const [drawer, setDrawer] = useState(false)


  function handleDrawerOpen() {
    setDrawer(true)
  }

  function handleDrawerClose() {
    setDrawer(false)
  }
  
  return (
    <React.Fragment>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            style={{position: "fixed", "z-index": "1"}}
          >
        <MenuIcon fontSize="large"/>
      </IconButton>
      <SideBar drawer={drawer} handleDrawerClose={handleDrawerClose}/>
        <Main saibaMais={true}/>
        <BacktoTop position={{right:"4%"}}/>
        <BemConectado/>
        <QuemSomos />
        <Contato/>
        <FAQ/>
        <Main saibaMais={false}/>
    </React.Fragment>
  )
}