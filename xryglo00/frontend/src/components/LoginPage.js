import React, {Component, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Navigate, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import AuthWarning from "./AuthWarning";
import { Avatar, Container, Box, Snackbar, Alert, Fade, Slide } from "@mui/material";
import ScreenLockPortraitIcon from '@mui/icons-material/ScreenLockPortrait';

const LoginPage = () => {
    const[email, setEmail ] = useState("");
    const[password, setPassword] = useState("");
    const[status, setStatus] = useState("");
    const[loginSuccess, setLoginSucess] = useState(false);
    const[loginFailed, setLoginFailed] = useState(false);

    const login = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        };
        fetch("api/login", requestOptions)
        .then((response) => 
        response.json())
         .then(async(data) =>{   
        if (data.status > 200) 
            setLoginFailed(true)
            //tady volat
        else{
            Auth.setJwt(data.token)
            Auth.setUserName(email.substring(0, email.indexOf('@')))
            await setUserInfo()
            setLoginSucess(true)
            window.location.href = "/"
        }
    })
    }
    const handleAlertClose = () => {
        setLoginFailed(false);
        setLoginSucess(false);
    }

    const setUserInfo = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "token": Auth.getJwt()
            }),
        };
        await fetch("api/userInfo", requestOptions)
        .then((response) => 
        response.json())
         .then((data) =>{   
            Auth.setCustomerId(data.customerId.id)
        })}
        
        return (
            <Container maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: '#064e33' }}>
                        <ScreenLockPortraitIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Přihlašte se
                    </Typography>
                    <Box component="form">
                        <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoFocus onChange={e => setEmail(e.target.value)} error={loginFailed}/>
                        <TextField margin="normal" required fullWidth id="password" label="Heslo" name="password" type="password" autoFocus onChange={e => setPassword(e.target.value)} error={loginFailed}/>
                        <Button variant='contained' onClick={login} fullWidth sx={{ mt: 3, mb: 2 }}>    
                           Přihlásit se
                        </Button>
                    </Box>
                </Box>
                <Snackbar open={loginSuccess} onClose={handleAlertClose} autoHideDuration={3000} message="Úspěšně přihlášeno."/> 
                <Snackbar open={loginFailed} onClose={handleAlertClose} autoHideDuration={3000} message="Nastala chyba při pokusu o přihlášení." TransitionComponent={Slide}>
                </Snackbar>
            </Container>
        )

}
export default LoginPage