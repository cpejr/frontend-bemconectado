import React, {useState} from 'react'
import { Container} from 'react-bootstrap';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IoIosChatboxes } from "react-icons/io";
import { IconContext } from "react-icons";

const perguntas = [
    {
        question: "Como o Bem-conectado verifica as instituições?",
        answer: "Um processo de validação da instituição é feito após o cadastro em nosso site. Antes de ser de fato exibida, ela passa por um processo de aprovação feito pela equipe. As informações enviadas são verificadas e pesquisamos o histórico dessa instituição. Validamos os sites e redes sociais. A avaliação é feita para verificarmos a instituição tem boas práticas sociais e está alinhada com nossos valores, tendo em vista garantir maior segurança e confiança do usuário.",
        number: "pergunta1",
    },
    {
        question: "A doação é feita por meio do Bem Conectado?",
        answer: "O Bem Conectado não tem nenhuma responsabilidade relativa a coleta da doação, é apenas um mecanismo de busca e divulgação.",
        number: "pergunta2",
    },
    {
        question: "Cadastrei minha instituição, mas não está aparecendo no site.",
        answer: "Antes de poder ser exibida, a instituição passa por um processo de verificação realizado pela equipe do Bem Conectado.",
        number:  "pergunta3",
    },
    {
        question: "Minha instituição não possui conta no PicPay",
        answer: "Não é necessário possuir uma conta no PicPay para se cadastrar, embora seja aconselhável, pois é um mecanismo fácil e ágil para coletar doações.",
        number:  "pergunta4",
    },
    {
        question: "Minha instituição atua em território nacional, qual endereço devo cadastrar?",
        answer: "Recomendamos que cadastre o endereço da sua sede e, na descrição, esclareça que possui atuação nacional.",
        number:  "pergunta5",
    }
]

export default function FAQ(){
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    var IOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    return(
        <Container style={{height: "auto"}}>
            <div style={{"margin-bottom": "20px"}}>
                <div>
                    <div style={{display: "flex"}}>
                        {IOS ? 
                        (
                            <div style={{"margin-top": "150px", display: "flex"}}>
                                <h1>FAQ</h1>
                                <IconContext.Provider value={{ size: '2.5em' }}>
                                    <IoIosChatboxes />
                                </IconContext.Provider>
                            </div>
                        ) 
                        :
                        (
                            <div style={{"margin-top": "40px", display: "flex"}}>
                                <h1>FAQ</h1>
                                <IconContext.Provider value={{ size: '2.5em' }}>
                                    <IoIosChatboxes />
                                </IconContext.Provider>
                            </div>
                        )
                        }
                    </div>
                    <div className='infoLine' />
                </div>
            </div>
            <div>
                {perguntas.map((each)=>{
                    return (
                        <ExpansionPanel expanded={expanded === each.number} onChange={handleChange(each.number)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${each.number}-content`}
                                id={`${each.number}-header`}
                            >
                                <Typography style={{"font-size": "2vh"}}>{each.question}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{"background-color": "#aba6a6", color: "#fff"}}>
                                <Typography style={{"font-size": "2vh"}}>
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

