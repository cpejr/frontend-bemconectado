import React, {useState} from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IoIosChatboxes } from "react-icons/io";
import { IconContext } from "react-icons";

const perguntas = [
    {
        question: "Como o Bem-conectado verifica as ongs?",
        answer: "Atravez do sistema de verificação",
        number: "pergunta1",
    },
    {
        question: "A doação é feita por meio do Bem Conectado?",
        answer: "O Bem Conectado não tem nenhuma responsabilidade relativa a coleta da doação, é apenas um mecanismo de busca e divulgação",
        number: "pergunta2",
    },
    {
        question: "Cadastrei minha instituição, mas não está aparecendo no site.",
        answer: "Antes de poder ser exibida, a instituição passa por um processo de verificação",
        number:  "pergunta3",
    },
    {
        question: "Minha instituição não possui conta no PicPay",
        answer: "Não é necessário possuir uma conta no PicPay para se cadastrar, embora seja aconselhável, pois é um mecanismo fácil e aágil para coletar doações",
        number:  "pergunta4",
    },
    {
        question: "Minha instituição atua em teritório nacional, qual endereço devo cadastrar?",
        answer: "Recomendamos que cadastre o endereço da sua sede e, na descrição, esclareça que possui atuação nacional",
        number:  "pergunta5",
    }
]

export default function FAQ(){
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return(
        <Container style={{height: "auto"}}>
            <Row style={{"margin-top": "75px", "margin-bottom": "20px"}}>
                <Col>
                    <h1>PERGUNTAS FREQUENTES</h1>
                    <div className='infoLine' />
                </Col>
                <Col>
                    <IconContext.Provider value={{ size: '2.5em' }}>
                        <IoIosChatboxes />
                    </IconContext.Provider>
                </Col>
            </Row>
            <div>
                {perguntas.map((each)=>{
                    return (
                        <ExpansionPanel expanded={expanded === each.number} onChange={handleChange(each.number)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${each.number}-content`}
                                id={`${each.number}-header`}
                            >
                                <Typography >{each.question}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{"background-color": "#aba6a6", color: "#fff"}}>
                                <Typography>
                                    {each.answer}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}
            </div>

        </Container>
    )
}

