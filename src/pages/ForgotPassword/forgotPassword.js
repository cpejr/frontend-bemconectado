import {
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();

  async function handleSubmit(e) {
    try {
      const response = await api.post("/forgotpassword", { email });
      const status = response.status;
      console.log(response.data);
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
    <div className="root">
      <button
        className="button-box-login"
        onClick={() => {
          history.push("/login");
        }}
      >
        <IoMdArrowBack />
      </button>
      <div className="loginContent">
        <div className="loginBox">
          <img className="logo-login" src="/logos/10.png" alt="logo" />

          <TextField
            className="usuario"
            id="outlined-start-adornment"
            value={email}
            placeholder="Email para recuperação"
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiUser size={22} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <div className="buttonsContainer">
            <button
              className="botaoentrar"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
