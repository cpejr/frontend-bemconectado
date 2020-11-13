import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { LoginContext } from "../../contexts/LoginContext";
import AllPendings from "./AllPendings";
import "./styles.css";

export default function Pendings() {
  const history = useHistory();

  const { token, user } = useContext(LoginContext);
  const { addToast } = useToasts();

  useEffect(() => {
    if (token !== "notYet" && user !== "notYet") {
      //Esses notYet sao gambiarra (Context ta rezetando toda atualizacao de pagina, nao era pra fazer isso)
      //Se esse useEffect vai antes do loginContext esse proximo if da pau sem os not yet aqui.
      if (token === null || user.type !== "admin") {
        history.push("/login");
        addToast("Admin deslogado", { appearance: "error" });
      }
    }
  });

  return <>{<AllPendings token={token} />}</>;
}
