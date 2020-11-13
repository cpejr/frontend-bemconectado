import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import { LoginContext } from "../../../contexts/LoginContext";
import OngView from './OngView';
import api from '../../../services/api';
import './styles.css';

export default function AllPendings({token}) {

  const [ongs, setOngs] = useState([]);
  const { logOut } = useContext(LoginContext);

  const history = useHistory();

  function handleLogOut(){
    logOut();
  }

  useEffect(() => {
    async function getOngs() {
      try {
        let ongsResponse = await api.get('admin',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        setOngs(ongsResponse.data);

      } catch (err) {
        console.warn(err);
      }
    }
    getOngs();
  }, [token]);

  return (
    <div>
      <div className="allPendingsTitle">ONGs pendentes ({ongs.length})</div>
      <div className="gridCard">
        {ongs && (ongs.length > 0) ? ongs.map((ong, index) => {
          return (
            <OngView key={index} ong={ong} token={token} />
          )
        }) : <div className="allPendingsTitle">Nao há ongs pendentes!</div>}
      </div>
      <div id="bttn">
        <Button className="mr-3" variant="primary" size="sm" onClick={(e) => handleLogOut()}>
          Log Out
        </Button>
        <Button variant="primary" size="sm" onClick={(e) => history.push("/")}>
          Voltar a página principal
        </Button>
      </div>
    </div>
  );
}