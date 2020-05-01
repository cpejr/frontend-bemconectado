import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Textfit } from 'react-textfit';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from 'react-icons';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


export default function QuemSomos(props) {
  const [showImage, setShowImage] = useState( () => {
      if (getWindowDimensions().width > 1000) 
        return true;
      else 
        return false
    }
  );

  useEffect(() => {
    function handleResize() {
      if (getWindowDimensions().width > 1000) 
        setShowImage(true);
      else 
        setShowImage(false);
    }
    
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleNextPage(){
    props.handlePageChange(3)
  }

  var IOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  return (
    <div className='rootContainer rootInfo'>

      <Container className='h-100'>
        <Row>
          <Col>
            {IOS ? <h1 style={{"margin-top": "100px"}}>QUEM SOMOS?</h1> : <h1>QUEM SOMOS?</h1>}
            
            <div className='infoLine' />
          </Col>
        </Row>
        <Row className='h-100 align-items-center'>

          {  
            showImage && (
              <Col xl={3} className="imgCol">
              <div style={{height: "10%"}}/>
              <img src='logolampada.png' alt='logoCpe' className='infoImage1' />
              </Col>
            )
          }

          <Col style={{height: "70%"}}>
            <Textfit mode="multi" className='text-justify fullHeight'>
              &nbsp;&nbsp;&nbsp;Nós somos a &nbsp;
              <a href="https://cpejr.com.br/site/" style={{color: "#CEC000"}}>
                CPE - Consultoria e Projetos Elétricos
              </a>
              , uma empresa júnior de Engenharias
              (Controle e Automação, Elétrica e Sistemas) da UFMG. A CPE é uma iniciativa sem fins
              lucrativos e que realiza projetos para incentivar o empreendedorismo no Brasil.
              Nosso corpo de membros é formado apenas por alunos destes cursos.
              <br /><br />
              &nbsp;&nbsp;&nbsp;A CPE participa do Movimento Empresa Júnior, que está presente em todo o mundo, sendo o brasileiro 
              o maior, e é composto por empresas dos mais variados cursos de graduação. Esse movimento é muito caracterizado pela
              conexão entre suas partes, e que as empresas costumam realizar projetos em conjunto e compartilhar
              experiência entre si.
              <br /><br />
              <div style={{cursor: "pointer", color: "#CEC000"}} onClick={handleNextPage}>
                CONTATO
                <IconContext.Provider value={{ size: '1.5em', color: "#CEC000" }} >
                  <MdKeyboardArrowDown />
                </IconContext.Provider>
              </div>
            </Textfit>
          </Col>
        </Row>
      </Container>
    </div>
  )
}