import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Textfit } from "react-textfit";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { HashLink } from "react-router-hash-link";


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function BemConectado(props) {
  const [showImage, setShowImage] = useState(() => {
    if (getWindowDimensions().width > 850) return true;
    else return false;
  });

  useEffect(() => {
    function handleResize() {
      if (getWindowDimensions().width > 850) setShowImage(true);
      else setShowImage(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  var IOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  return (
    <div className="rootContainer rootInfo" id="saibaMais">
      <div className="h-100 w-100 m-0">
        <Row>
          <Col>
            {IOS ? (
              <h1 style={{ "margin-top": "150px" }}>O QUE É O BEM CONECTADO</h1>
            ) : (
              <h1 style={{ "margin-top": "40px" }}>O QUE É O BEM CONECTADO</h1>
            )}
            <div className="infoLine" />
          </Col>
        </Row>

        <div style={{ height: "100%", display: "flex", width: "100%" }}>
          <div style={{ height: "70%", "margin-top": "45px", display: "flex" }}>
            <Textfit
              mode="multi"
              className="text-justify"
              style={{ height: "80%" }}
            >
              <div className="h-100">
                &nbsp;&nbsp;&nbsp;Sabemos que nosso país, atualmente, enfrenta
                uma crise sem precedentes provocada pelo COVID-19. Nesse
                contexto, a solidariedade é fundamental para diminuir o impacto
                na população. Sabemos que já existem inúmeras iniciativas que
                estão movendo seus esforços para ajudar o próximo, oferecendo
                suporte às pessoas que estão sendo impactados por esta pandemia,
                como médicos, enfermeiros, familias que perderam suas fontes de
                renda, microempreendedores, etc. Porém, muitas vezes elas acabam
                se perdendo na internet e não chegam nas pessoas que deveriam
                ser alcançadas. Assim, criamos essa plataforma para auxiliar a
                sua interação com diversas ONGs e outras instituiçõs de
                caridade, facilitar a obtenção de informações sobre elas e
                incentivar o surgimento de novas.
                <br /> <br />
                &nbsp;&nbsp;&nbsp;Aqui será possível encontrar iniciativas que
                contam com seu apoio! Você é muito importante nessa luta! Faça
                parte dela também!
                <br /> <br />
                <HashLink
                  smooth
                  to="#sobreNos"
                  style={{ cursor: "pointer", color: "#CEC000" }}
                >
                  SOBRE NÓS
                  <IconContext.Provider
                    value={{ size: "1.5em", color: "#CEC000" }}
                  >
                    <MdKeyboardArrowDown />
                  </IconContext.Provider>
                </HashLink>
              </div>
            </Textfit>
          </div>
          {showImage && (
            <div style={{ height: "80%", display: "flex", width: "18%" }}>
              <img src="/images/network.png" alt="Network" className="imgFullHeight" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
