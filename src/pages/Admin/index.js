import React from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FiUser, FiLock } from "react-icons/fi"
import {
    TextField,
    CssBaseline,
    OutlinedInput,
    IconButton,
    InputAdornment
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./styles.css";

export default function LoginAdmin() {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <div className="root">

                <div className="loginBox">

                    <tittle className="loginText">Entrar</tittle>

                    <TextField className="usuario"
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <FiUser size={22} />
                            </InputAdornment>,
                        }}
                        variant="outlined"
                    />

                    <OutlinedInput className="senha"
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        startAdornment={<InputAdornment position="start">
                            <FiLock size={22} />
                        </InputAdornment>}
                        labelWidth={0}
                    />

                    <div>
                        <Link to="/" className="link">
                            <Button className="botaoentrar">Entrar</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
