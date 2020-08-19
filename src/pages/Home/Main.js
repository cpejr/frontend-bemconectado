import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: 16,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
});

export default function Main(props) {

  const classes = useStyles();
  return (
    <div className={classes.bgImage} id='main'>
      <div className='overlay rootContainer rootInfo'>
        <p className='title1'>
          BEM CONECTADO
        </p>
        <p className='subTitle'>
          Juntos podemos fazer a diferença
        </p>

          <Link to='/list'>
            <Button variant="contained" className="homeButton">
              <p className='buttonText'>AJUDAR AGORA</p>
            </Button>
          </Link>

        {
          props.saibaMais && (
            <HashLink smooth to="#saibaMais" className='saibaMais' style={{cursor: "pointer"}}>
              Saiba mais
              <IconContext.Provider value={{ size: '1.5em', color: "#ffff" }} >
                <MdKeyboardArrowDown />
              </IconContext.Provider>
            </HashLink>
          )
        }
      </div>
    </div>

  )
}