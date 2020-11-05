import React, { useState, useContext, useEffect } from "react";

import UserDataCard from "../../../components/UserDataCard";
import "./styles.css";

import { LoginContext } from "../../../contexts/LoginContext";
import { Button, Form } from 'react-bootstrap'
import api from "../../../services/api";
import { useToasts } from "react-toast-notifications";

export default function Profile(props) {
  const { user } = useContext(LoginContext);

  const [data, setData] = useState({});
  const [previousData, setPreviousData] = useState({});
  const { addToast } = useToasts();
  
  useEffect(() => {
    const currUser = user;
    setData({ ...currUser });
    setPreviousData({ ...currUser }); //Creates true obj copy, not reference.
  }, [user]);

  const UserData1 = [
    { title: "Nome", objKey: "name" },
    { title: "E-mail", objKey: "email" },
    { title: "Telefone", objKey: "phoneNumber" },
    { title: "Site", objKey: "site" },
    { title: "CPF/CNPJ", objKey: "cnpj" },
  ];

  const UserData2 = [
    { title: "Facebook", objKey: "facebook" },
    { title: "Instagram", objKey: "instagram" },
    { title: "Pic Pay", objKey: "picpay" },
  ];

  const UserData3 = [
    { title: "Banco", objKey: "bank" },
    { title: "Agência", objKey: "branch" },
    { title: "Conta", objKey: "bankAccount" },
  ];

  async function handleSubmit(e) {
    try {
      const response = await api.post("/forgotpassword", { email: user.email });
      const status = response.status;
      if (status === 200) {
        addToast("Pedido enviado para o e-mail", { appearance: "success" });
      } else {
        addToast("E-mail inválido", { appearance: "error" });
      }
    } catch (error) {
      addToast("E-mail inválido", { appearance: "error" });
    }
  }

  return (
    <div className="profile">
      {" "}
      {/* this class is required for UserDataCard component */}
      <UserDataCard
        mainTitle="Informações Gerais"
        description={
          "Esses são os dados que estarão visíveis para o público." +
          " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."
        }
        genVector={UserData1}
        data={data}
        previousData={previousData}
        setData={setData}
      >
        <div className="infoEditableLine">
          <label className="infoEditableTitle">Alterar senha</label>
          <div className="infoEditableContent">
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Alterar Senha
            </Button>
          </div>
        </div>
      </UserDataCard>
      <UserDataCard
        mainTitle="Imagem"
        description={
          "Esses são os dados que estarão visíveis para o público." +
          " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."
        }
      >
        <EditImage image={user.imageSrc}/>
      </UserDataCard>
      <UserDataCard
        mainTitle="Redes Sociais"
        description={
          "Esses são os dados que estarão visíveis para o público." +
          " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."
        }
        genVector={UserData2}
        data={data}
        previousData={previousData}
        setData={setData}
      />
      <UserDataCard
        mainTitle="Conta Bancária"
        description={
          "Esses são os dados que estarão visíveis para o público." +
          " Esses dados são monitorados pela equipe do bem conectado e são sujeitos a modificação."
        }
        genVector={UserData3}
        data={data}
        previousData={previousData}
        setData={setData}
      />
    </div>
  );
}

function EditImage({image}) {
  return (
    <div className="EditImageContainer">
      <p className="mb-1">Pré-vizualização no cartão exibido na Página inicial:</p>
      <div className="userImgContainer">
        {/* <img src={`https://drive.google.com/uc?id=${image}`} className="userImg"/> */}
        <img src="/images/logoFinal.png" className="userImg" alt="preview image"/>
      </div>
      <Form className="mt-3">
        <Form.File 
          id="custom-file"
          label="Nome do arquivo"
          custom
          data-browse="Escolha o arquivo"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={(e) => console.log(e)}
        >
        </Form.File>
        {/* o((⊙﹏⊙))o. */}
      </Form>
      <Button size="sm" className="mt-3">Alterar imagem</Button>
    </div>
  )
}
