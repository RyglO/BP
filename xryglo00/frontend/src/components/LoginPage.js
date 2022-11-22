import React, {Component, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Navigate, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import AuthWarning from "./Alerts";

const LoginPage = () => {
    const[email, setEmail ] = useState("");
    const[password, setPassword] = useState("");
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
         .then((data) =>{   
        console.log(data)
        data.status > 200 ? AuthWarning : Auth.setJwt(data.token) 
        
        window.location.href = "/";
    })
    }

    return(
        <Grid container spacing={1}> 
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Wattee
                </Typography>   
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Přihlašte se prosím
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
             <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="text" label="Email" onChange={e => setEmail(e.target.value)}/>     
                </FormControl>    
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="password" label="Heslo" onChange={e => setPassword(e.target.value)}/>     
                </FormControl>     
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' onClick={login} >
                    Přihlásit se
                </Button>        
            </Grid>   
        </Grid>
        );

}
export default LoginPage