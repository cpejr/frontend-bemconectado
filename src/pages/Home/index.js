import React, { useState } from 'react';
import ReactPageScroller from "react-page-scroller";
import './styles.css';

import {IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Main from './Main';
import QuemSomos from './QuemSomos';
import BemConectado from './BemConectado';
import SideBar from './SideBar';
import Contato from './Contato';
import FAQ from './FAQ';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(null);
  const [drawer, setDrawer] = useState(false)

  const handlePageChange = number => {
    setCurrentPage(number); // set currentPage number, to reset it from the previous selected.
  };

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
      <SideBar drawer={drawer} handleDrawerClose={handleDrawerClose} handlePageChange={handlePageChange}/>
      <ReactPageScroller pageOnChange={handlePageChange} customPageNumber={currentPage} renderAllPagesOnFirstRender={true}>
        <Main handlePageChange={handlePageChange} saibaMais={true}/>
        <BemConectado handlePageChange={handlePageChange}/>
        <QuemSomos handlePageChange={handlePageChange}/>
        <Contato/>
        <FAQ/>
        <Main saibaMais={false}/>
      </ReactPageScroller>
    </React.Fragment>
  )
}