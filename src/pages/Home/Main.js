import React, {useState, useEffect} from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Carousel } from 'react-bootstrap';

import { useHistory } from "react-router-dom";
import api from "../../services/api";



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

  const [ongs, setOngs] = useState([]);

  const [categs, setCategs] = useState([]);

  const history = useHistory();


    useEffect(() => {

      async function getOngs(setOngs){

        const ONGSPERPAGE = 9;
      
        const totalCountResponse = await api.get(`/ongsCount`);
        const totalCount = totalCountResponse.headers["x-total-count"];
      
        const pages = Math.ceil(totalCount / ONGSPERPAGE);
      
        const ongsResponse = await api.get(`/ongs?page=1`);
    
        setOngs(ongsResponse.data);
      }

      try{
        getOngs(setOngs);
      }catch(err){
        console.log(err);
      }
    }, [setOngs]);
    
    console.log(ongs)

    let idOngs = [];
    let imageOngs = [];

    ongs.map( ong => {
      idOngs.push(ong._id)
      imageOngs.push(ong.imageSrc)
      }
    );

    async function handleClick(ong) {
      await api.post(`/registerAcess/${ong._id}`);
        api.get(`categ/${ong._id}`).then((resultVector) => {
          if (resultVector) {
            setCategs(resultVector.data);
          }
        });
      history.push({
        pathname: "/ongshow",
        state: {
          ong: ong,
          categs: categs,
          count: 0,
        },
      });
    }

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
          <Link className=" botoesHome" to='/list'>
            {/* <Button variant="contained" className="homeButton"> */}
              {/* <p className='buttonText'>AJUDAR AGORA</p> */}
              AJUDAR AGORA
            {/* </Button> */}
          </Link>

          <Link className=" botoesHome" to="/register">
                Cadastre sua instituição
          </Link>
        </div>

        <Carousel interval={3000} >
          <Carousel.Item>
            
            <div className="Ongsphotos">
              <img
                src={`https://drive.google.com/uc?id=${ imageOngs[0]}`}
                alt="logo"
                onClick={() => handleClick(ongs[0])}
              />
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[1]}`}
                alt="logo"
                onClick={() => handleClick(ongs[1])}
              />
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[2]}`}
                alt="logo"
                onClick={() => handleClick(ongs[2])}
              />
              
            </div>
          </Carousel.Item>
          <Carousel.Item>
            
            <div className="Ongsphotos">
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[3]}`}
                alt="logo"
                onClick={() => handleClick(ongs[3])}
              />
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[4]}`}
                alt="logo"
                onClick={() => handleClick(ongs[4])}
              />
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[5]}`}
                alt="logo"
                onClick={() => handleClick(ongs[5])}
              />
              
            </div>
          </Carousel.Item>
          <Carousel.Item>
            
            <div className="Ongsphotos">
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[6]}`}
                alt="logo"
                onClick={() => handleClick(ongs[6])}
              />
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[7]}`}
                alt="logo"
                onClick={() => handleClick(ongs[7])}
              />
              <img
                src={`https://drive.google.com/uc?id=${imageOngs[8]}`}
                alt="logo"
                onClick={() => handleClick(ongs[8])}
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