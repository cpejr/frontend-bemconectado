import React from 'react'
import { MdLocalPhone, MdEmail } from "react-icons/md";
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
                        <a className="infoData" href={`tel:3678-3672`}>3678-3672</a>
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
                </div>
            </Row>

        </Container>
    )
}