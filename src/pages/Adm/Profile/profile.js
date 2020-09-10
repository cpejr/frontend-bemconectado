import React, {useState, useContext, useEffect} from 'react';
import { Edit } from '@material-ui/icons';
// import { IconButton } from '@material-ui/core';
import InputEditable from './../../../components/inputEditable'
import './styles.css';

import { LoginContext } from '../../../contexts/LoginContext';

export default function Header(props){

    const {user} = useContext(LoginContext);

    const [data, setData] = useState({});
    const [previousData, setPreviousData] = useState({});
    
    useEffect(()=>{
        setData(user)
        setPreviousData();
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
                        <InputEditable title="Nome" value={data} setValue={setData} objKey="name"/>
                        <InputEditable title="E-mail" value={data} setValue={setData} objKey="email" />
                        <InputEditable title="Telefone" value={data} setValue={setData} objKey="phonenumber"/>
                        <InputEditable title="Site" value={data} setValue={setData} objKey="site"/>
                        <InputEditable title="CPF/CNPJ" value={data} setValue={setData} objKey="cnpj"/>
                        
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
                        <InputEditable title="Facebook" value={data} setValue={setData} objKey="facebook"/>
                        <InputEditable title="Instagram" value={data} setValue={setData} objKey="instagram"/>
                        <InputEditable title="Pic Pay" value={data} setValue={setData} objKey="picpay"/>
                        <InputEditable title="Whatsapp" value={data} setValue={setData} objKey="whatsapp"/>
                        
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
                        <InputEditable title="Banco" value={data} setValue={setData} objKey="bank"/>
                        <InputEditable title="Agência" value={data} setValue={setData} objKey="branch"/>
                        <InputEditable title="Conta" value={data} setValue={setData} objKey="bankAccount"/>
                        
                    </form>
                </div>
            </div>


        </div>
    )
}