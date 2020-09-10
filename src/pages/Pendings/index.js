import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AllPendings from './AllPendings'

import './styles.css';
import { LoginContext } from '../../contexts/LoginContext';

export default function Pendings() {

  const history = useHistory();

  const {token, user} = useContext(LoginContext);

  useEffect(() => {
    console.log("Entrou no use effect: ", token, user);
    if (token !== "notYet" && user !== "notYet"){ 
      //Esses notYet sao gambiarra (Context ta rezetando toda atualizacao de pagina, nao era pra fazer isso)
      //Se esse useEffect vai antes do loginContext esse proximo if da pau sem os not yet aqui.
      if (!(token && user.type === 'admin')) {
        history.push('/login');
        alert("You are not logged in!");
      }
    }
  });

  return (
    <>
      {<AllPendings token={token} />}
    </>
  );
}