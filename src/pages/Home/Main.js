import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Carousel } from 'react-bootstrap'


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
        <p className='mainTitle'>
          BEM CONECTADO
        </p>
        <p className='subTitle'>
          Juntos podemos fazer a diferença
        </p>

        <div className="buttons">
          <Link to='/list'>
            <Button variant="contained" className="homeButton">
              <p className='buttonText'>AJUDAR AGORA</p>
            </Button>
          </Link>

          <Link className="redondo botaoCadastrar" to="/register">
                Cadastre sua instituição
          </Link>
        </div>

        <Carousel interval={3000}>
          <Carousel.Item>

            <div>
              <img
                // className="d-block w-100"
                onClick={() => console.log('CLICOU 1')}
                src="ong.png"
                alt="First slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="First slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="First slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div>
              <img
                // className="d-block w-100"
                onClick={() => console.log('CLICOU 2')}
                src="ong.png"
                alt="Third slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="Third slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="Third slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="Third slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div>
              <img
                // className="d-block w-100"
                onClick={() => console.log('CLICOU 3')}
                src="ong.png"
                alt="Third slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="Third slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="Third slide"
              />
              <img
                // className="d-block w-100"
                src="ong.png"
                alt="Third slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
        

        {
          props.saibaMais && (
            <HashLink smooth to="#saibaMais" className='saibaMais' style={{cursor: "pointer"}}>
              <span>Saiba mais</span>
              <IconContext.Provider value={{ size: '1.5em', color: "#ffff"}} >
                <MdKeyboardArrowDown />
              </IconContext.Provider>
            </HashLink>
          )
        }
      </div>
    </div>

  )
}