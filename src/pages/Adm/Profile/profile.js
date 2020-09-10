import React, {useState, useContext, useEffect} from 'react';
import { Edit } from '@material-ui/icons';
// import { IconButton } from '@material-ui/core';
import InputEditable from './../../../components/inputEditable'
import './styles.css';

import { LoginContext } from '../../../contexts/LoginContext';

export default function Header(props){

    const {user} = useContext(LoginContext);

    // Dados Gerais
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [endereco, setEndereco] = useState();
    const [telefone, setTelefone] = useState();
    const [site, setSite] = useState();
    const [cpfCNPJ, setCPFCNPJ] = useState();
    
    // Redes Sociais
    const [facebook, setFacebook] = useState();
    const [instagram, setInstagram] = useState();
    const [picpay, setPicPay] = useState();
    const [youtube, setYoutube] = useState();
    const [whatsapp, setWhatsapp] = useState();
    
    // Dados Bancários
    const [banco, setBanco] = useState();
    const [agencia, setAgencia] = useState();
    const [conta, setConta] = useState();
    
    useEffect(()=>{
        setNome(user.name);
        setEmail(user.email);
        setTelefone(user.phonenumber);
        setSite(user.site);
        setCPFCNPJ(user.cnpj);
        setFacebook(user.facebook);
        setInstagram(user.instagram);
        setPicPay(user.picpay);
        setWhatsapp(user.whatsapp);
        setBanco(user.bank);
        setAgencia(user.branch);
        setConta(user.bankAccount);
    }, [user]);
    
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