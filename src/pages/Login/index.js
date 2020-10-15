import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import {
  TextField,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { LoginContext } from "../../contexts/LoginContext";

import "./styles.css";
import api from "../../services/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { token, user, signIn } = useContext(LoginContext);

  useEffect(() => {
    if (token && user.type === "admin") {
      history.push("pendings");
    }
    if (token && user.type === "user") {
      history.push("adminOng");
    }
  });

  async function handleSubmit(e) {
    try {
      const response = await api.post("session", {
        email,
        password,
      });
      if (response.data && response.data.accessToken) {
        const token = response.data.accessToken;
        const user = response.data.user;
        signIn(token, user);
        if (user.type === "admin") {
          history.push("/pendings");
        } else {
          history.push("/");
        }
      } else {
        alert("Usuário ou senha incorretos!");
        if (response.data.error) console.log(response.data.error);
      }
    } catch (error) {
      alert("Acesso negado!");
      console.log(error);
    }
  }

  return (
    <div className="root">
      <button
        className="button-box-login"
        onClick={() => {
          history.push("/list");
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

          <OutlinedInput
            className="senha"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <FiLock size={22} />
              </InputAdornment>
            }
            labelWidth={0}
          />

          <div className="buttonsContainer">
            <button
              className="botaoentrar"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Entrar
            </button>
            <button>
              <Link to="/forgotpassword">
                <Typography>Esqueci minha senha</Typography>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
