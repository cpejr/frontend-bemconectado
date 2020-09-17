import React, {useState, useContext, useEffect} from 'react';
import InputEditable from '../../../components/InputEditable'
import './styles.css';

import { LoginContext } from '../../../contexts/LoginContext';

export default function Header(props){

    const {user} = useContext(LoginContext);

    const [data, setData] = useState({});
    const [previousData, setPreviousData] = useState({});
    
    useEffect(()=>{
        console.log("UseEffect do profile", user);
        const currUser = user; 
        setData(currUser)
        setPreviousData(Object.assign({},currUser)); //Creates true obj copy, not reference.
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
                        <InputEditable title="Nome" data={data} previousData={previousData} setData={setData} objKey="name"/>
                        <InputEditable title="E-mail" data={data} previousData={previousData} setData={setData} objKey="email" />
                        <InputEditable title="Telefone" data={data} previousData={previousData} setData={setData} objKey="phonenumber"/>
                        <InputEditable title="Site" data={data} previousData={previousData} setData={setData} objKey="site"/>
                        <InputEditable title="CPF/CNPJ" data={data} previousData={previousData} setData={setData} objKey="cnpj"/> 
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
                        <InputEditable title="Facebook" data={data} previousData={previousData} setData={setData} objKey="facebook"/>
                        <InputEditable title="Instagram" data={data} previousData={previousData} setData={setData} objKey="instagram"/>
                        <InputEditable title="Pic Pay" data={data} previousData={previousData} setData={setData} objKey="picpay"/>
                        <InputEditable title="Whatsapp" data={data} previousData={previousData} setData={setData} objKey="whatsapp"/>
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
                        <InputEditable title="Banco" data={data} previousData={previousData} setData={setData} objKey="bank"/>
                        <InputEditable title="Agência" data={data} previousData={previousData} setData={setData} objKey="branch"/>
                        <InputEditable title="Conta" data={data} previousData={previousData} setData={setData} objKey="bankAccount"/>
                    </form>
                </div>
            </div>


        </div>
    )
}