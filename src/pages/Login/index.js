import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { FiUser, FiLock } from "react-icons/fi"
import {
    TextField,
    OutlinedInput,
    Typography,
    IconButton,
    InputAdornment
} from '@material-ui/core';
import { Visibility, VisibilityOff }  from '@material-ui/icons';

import "./styles.css";
import api from "../../services/api";

export default function Login() {

    const [showPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function handleSubmit() {
        try {
            const response = await api.post('session', {
                email,
                password
            })
            if (response.data && response.data.accessToken) {
                const token = response.data.accessToken;
                const user = response.data.user;
                localStorage.setItem("accessToken", token)
                if (user.type === "admin") {
                    history.push('/pendings', { token: token })
                }
                else {
                    history.push('/')
                }
            }
            else {
                alert("Usuário ou senha incorretos!")
                if (response.data.error)
                    console.log(response.data.error)
            }
        }
        catch (error) {
            alert("Acesso negado!")
            console.log(error)
        }
    }

    return (
        <div className="root">
            <div className="loginBox">
                
                <Typography className="loginText">Entrar</Typography>

                <TextField className="usuario"
                    id="outlined-start-adornment"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <FiUser size={22} />
                        </InputAdornment>,
                    }}
                    variant="outlined"
                />

                <OutlinedInput className="senha"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    startAdornment={<InputAdornment position="start">
                        <FiLock size={22} />
                    </InputAdornment>}
                    labelWidth={0}
                />

                <div>
                    <Button className="botaoentrar" onClick={handleSubmit}>Entrar</Button>
                </div>
            </div>
        </div>
    );
}
