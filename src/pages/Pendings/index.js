import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { LoginContext } from "../../contexts/LoginContext";
//import AllPendings from "./AllPendings";
import api from "../../services/api";
import "./styles.css";

export default function Pendings() {
  const history = useHistory();

  const { token, user } = useContext(LoginContext);
  const [ongs, setOngs] = useState([]);
  const { addToast } = useToasts();

  async function getOngs() {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    console.log("Chamando!");
    const response = await api.get("/admin", config);
    console.log("ongs: ", ongs);
    setOngs(response.data);
  }

  useEffect(() => {
    if (token !== "notYet" && user !== "notYet") {
      //Esses notYet sao gambiarra (Context ta rezetando toda atualizacao de pagina, nao era pra fazer isso)
      //Se esse useEffect vai antes do loginContext esse proximo if da pau sem os not yet aqui.
      if (token === null || user.type !== "admin") {
        history.push("/login");
        addToast("Admin deslogado", { appearance: "error" });
      }
      getOngs(setOngs);
    }
  }, [token, user]);

  return (
    // <AllPendings token={token} />
    <>
      <AdminHeader/>
      <div className="adminContent">
        <div className="adminTitle">

        </div>
        <div className="adminSpace">
          <p>Ongs pendentes:</p>
          <div className="pendingOngs">
            {
              ongs && ongs.map((ong) => {
                return (
                  <div>
                    {ong.name}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

function adminHeader() {
  return (
    <div className="adminHeader">
      <img src="/logos/10.png" className="adminLogo" />
      <p>Área de Administração do Bem Conectado</p>
    </div>
  )
}

function OngPreview({ ong }) {

  return (
    <></>
  )
}
