import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { FiUser, FiLock } from "react-icons/fi"
import {
    TextField,
    CssBaseline,
    OutlinedInput,
    Typography,
    IconButton,
    InputAdornment
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./styles.css";
import api from "../../services/api";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
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
                localStorage.setItem("accessToken", response.data.accessToken)
                const user = response.data.user
                if (user.type === "admin") {
                    history.push('/pendings', { token: response.data.accessToken })
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

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({ ...values, showPassword: !values.showPassword });
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    return (
        <React.Fragment>
            <CssBaseline />

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
                                    // onClick={setShowPassword(!showPassword)}
                                    // onMouseDown={handleMouseDownPassword}
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
                        <Button className="botaoentrar" onClick={handleSubmit}> Entrar</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
