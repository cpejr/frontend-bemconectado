import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import UserDataCard from '../../../components/UserDataCard';
import './styles.css';

import { LoginContext } from '../../../contexts/LoginContext';

export default function Profile(props) {

    const { user } = useContext(LoginContext);

    const [data, setData] = useState({});
    const [previousData, setPreviousData] = useState({});
    const history = useHistory();

    useEffect(() => {

        // console.log("UseEffect do profile", user);
        const currUser = user;
        setData({...currUser})
        setPreviousData({ ...currUser }); //Creates true obj copy, not reference.

    }, [user]);

    const UserData1 = [
        { title: "Nome", objKey: "name" },
        { title: "E-mail", objKey: "email" },
        { title: "Telefone", objKey: "phoneNumber" },
        { title: "Site", objKey: "site" },
        { title: "CPF/CNPJ", objKey: "cnpj" }
    ]

    const UserData2 = [
        { title: "Facebook", objKey: "facebook" },
        { title: "Instagram", objKey: "instagram" },
        { title: "Pic Pay", objKey: "picpay" },
    ]

    const UserData3 = [
        { title: "Banco", objKey: "bank" },
        { title: "Agência", objKey: "branch" },
        { title: "Conta", objKey: "bankAccount" },
    ]

    return (
        <div className="profile" > {/* this class is required for UserDataCard component */}

            <UserDataCard
                mainTitle="Informações Gerais"
                description={"Esses são os dados que estarão visíveis para o público." +
                    " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."}
                genVector={UserData1}
                data={data}
                previousData={previousData}
                setData={setData}
            />

            <UserDataCard
                mainTitle="Redes Sociais"
                description={"Esses são os dados que estarão visíveis para o público." +
                    " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."}
                genVector={UserData2}
                data={data}
                previousData={previousData}
                setData={setData}
            />

            <UserDataCard
                mainTitle="Conta Bancária"
                description={"Esses são os dados que estarão visíveis para o público." +
                    " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."}
                genVector={UserData3}
                data={data}
                previousData={previousData}
                setData={setData}
            />

        </div>
    )
}