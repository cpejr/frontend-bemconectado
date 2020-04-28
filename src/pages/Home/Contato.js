import React from 'react'
import { MdLocalPhone, MdEmail, MdPlace } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Container, Col, Row } from 'react-bootstrap';

export default function Contato(){
    return (
        <Container style={{height: "100%"}}>
            <Row>
                <Col>
                    <h1 style={{"margin-top": "75px"}}>CONTATO</h1>
                    <div className='infoLine' />
                </Col>
            </Row>
            
            <Row className="contatoContainer">
                <div className="centerContainer">
                    <div className="infoContainer">
                        <div className="iconContainer">
                            <IconContext.Provider value={{ size: '3em' }}>
                                <MdLocalPhone />
                            </IconContext.Provider>
                        </div>
                        <a className="infoData" href="tel:31997791734">(31) 99779-1734</a>
                    </div>
                    <div className="infoContainer">
                        <div className="iconContainer">
                                <IconContext.Provider value={{ size: '3em' }}>
                                    <MdEmail />
                                </IconContext.Provider>
                        </div>
                        <p className="infoData">bemconectado@cpejr.com.br</p>
                    </div>
                    <div className="infoContainer">
                        <div className="iconContainer">
                                <IconContext.Provider value={{ size: '3em' }}>
                                    <AiOutlineGlobal />
                                </IconContext.Provider>
                        </div>
                        <a href="https://cpejr.com.br/site/" className="infoData">www.cpejr.com.br</a>
                    </div>
                    <div className="infoContainer">
                        <div className="iconContainer">
                                <IconContext.Provider value={{ size: '3em' }}>
                                    <MdPlace />
                                </IconContext.Provider>
                        </div>
                        <a className="infoData" target="_blank" rel="noopener noreferrer" href="http://maps.google.com/maps?q=CPE - Consultoria e Projetos Elétricos Júnior, Universidade Federal de Minas Gerais - Avenida Presidente Antônio Carlos - Campus Pampulha, Belo Horizonte - MG" >
                            Av. Presidente Antônio Carlos, 6627, CPDEE, sala 112, UFMG Campus Pampulha, Belo Horizonte – MG
                        </a>
                    </div>
                </div>
            </Row>

        </Container>
    )
}