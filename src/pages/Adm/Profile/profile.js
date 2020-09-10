import React, {useState} from 'react';
import { Edit } from '@material-ui/icons';
// import { IconButton } from '@material-ui/core';
import InputEditable from './../../../components/inputEditable'
import './styles.css';

export default function Header(props){

    // Dados Gerais
    const [nome, setNome] = useState("QUASE MEIA NOITE");
    const [email, setEmail] = useState("EMAIL 2");
    const [endereco, setEndereco] = useState("QUINTA FEIRA");
    const [telefone, setTelefone] = useState("007");
    const [site, setSite] = useState("WORDPRESS");
    const [cpfCNPJ, setCPFCNPJ] = useState("01");
    
    // Redes Sociais
    const [facebook, setFacebook] = useState("FACE");
    const [instagram, setInstagram] = useState("INSTA");
    const [picpay, setPicPay] = useState("PICPAY");
    const [youtube, setYoutube] = useState("YOUTUBE");
    const [whatsapp, setWhatsapp] = useState("ZAPZAP");
    
    // Dados Bancários
    const [banco, setBanco] = useState("ALGUM BANCO");
    const [agencia, setAgencia] = useState("ALGUMA AGENCIA");
    const [conta, setConta] = useState("ALGUAM CONTA");
    

    return (
        <div className = "profile" >

            <div className="cardInfo">

                <div className="userProfile">
                    <h2>Informações Gerais</h2>
                    <p>Esses são os dados que estarão visíveis para o público. Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação.</p>
                </div>
                
                <div className="infoEditable">
                    <form>
                        <InputEditable title="Nome" value={nome} setValue={setNome} />
                        <InputEditable title="E-mail" value={email} setValue={setEmail} />
                        <InputEditable title="Endereço" value={endereco} setValue={setEndereco} />
                        <InputEditable title="Telefone" value={telefone} setValue={setTelefone} />
                        <InputEditable title="Site" value={site} setValue={setSite} />
                        <InputEditable title="CPF/CNPJ" value={cpfCNPJ} setValue={setCPFCNPJ} />
                        
                    </form>
                </div>
            </div>

            <div className="cardInfo">
                <div className="userProfile">
                    <h2>Redes Sociais</h2>
                    <p>Esses são os dados que estarão visíveis para o público. Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação.</p>
                </div>
                
                <div className="infoEditable">
                    <form>
                        <InputEditable title="Facebook" value={facebook} setValue={setFacebook} />
                        <InputEditable title="Instagram" value={instagram} setValue={setInstagram} />
                        <InputEditable title="Pic Pay" value={picpay} setValue={setPicPay} />
                        <InputEditable title="YouTube" value={youtube} setValue={setYoutube} />
                        <InputEditable title="Whatsapp" value={whatsapp} setValue={setWhatsapp} />
                        
                    </form>
                </div>
            </div>

            <div className="cardInfo" style={ {marginBottom:'3vh'} }>
                <div className="userProfile">
                    <h2>Dados Bancários</h2>
                    <p>Esses são os dados que estarão visíveis para o público. Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação.</p>
                </div>
                <div className="infoEditable">
                    <form>
                        <InputEditable title="Banco" value={banco} setValue={setBanco} />
                        <InputEditable title="Agência" value={agencia} setValue={setAgencia} />
                        <InputEditable title="Conta" value={conta} setValue={setConta} />
                        
                    </form>
                </div>
            </div>


        </div>
    )
}