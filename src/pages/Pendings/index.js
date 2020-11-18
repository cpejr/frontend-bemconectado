import React, { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { CgLogOut } from "react-icons/cg";

import { LoginContext } from "../../contexts/LoginContext";
//import AllPendings from "./AllPendings";
import api from "../../services/api";
import "./styles.css";

export default function Pendings() {
  const { token, user } = useContext(LoginContext);
  const [ongs, setOngs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  const history = useHistory();

  async function getOngs() {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const response = await api.get("/admin", config);
    console.log("ongs: ", ongs);
    setOngs(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (token !== "notYet" && user !== "notYet") {
      //Esses notYet sao gambiarra (Context ta rezetando toda atualizacao de pagina, nao era pra fazer isso)
      //Se esse useEffect vai antes do loginContext esse proximo if da pau sem os not yet aqui.
      if (token === null || user.type !== "admin") {
        history.push("/login");
        addToast("Admin deslogado", { appearance: "error" });
      } else {
        getOngs(setOngs);
      }
    }
  }, [token, user]);

  return (
    // <AllPendings token={token} />
    <div className="adminPage">
      <AdminHeader />
      <div className="adminContent">
        <div className="adminTitle">
          <p>Ongs pendentes:</p>
        </div>
        <div className="adminHint">
          ! - Clique nos cards para avaliar as Iniciativas
        </div>
        <div className="adminSpace">
          {
            loading ? <ClipLoader size={50} color={"#fff"} loading={true} /> :
              <div className="pendingOngs">
                {
                  ongs.length > 0 ? ongs.map((ong) => {
                    return (
                      <OngPreview ong={ong} key={ong._id} />
                    )
                  }) :
                    <p>Nenhuma iniciativa aguardando aprovação</p>
                }
              </div>
          }
        </div>
      </div>
    </div>
  );
}

function AdminHeader() {
  const { logOut } = useContext(LoginContext);
  const history = useHistory();

  function handleLogOut(){
    logOut();
    history.push("/");
  }

  return ( 
    <div className="adminHeader">
      <CgLogOut className="adminLogout" size={40} onClick={(e) =>{handleLogOut()}}/>
      <img src="/logos/10.png" className="adminLogo" />
      <p>Área de Administração do Bem Conectado</p>
    </div>
  )
}

function OngPreview({ ong }) {
  return (
    <div className="cardContainer">
      <div className="cardName">{ong.name}</div>
      <div className="userImgContainer">
        <img src={`https://drive.google.com/uc?id=${ong.imageSrc}`} className="userImg" alt="preview" />
      </div>
      <div className="cardDescription">{ong.description}</div>
    </div>
  )
}
